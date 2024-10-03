
In the BloodBank project, we have different roles like donor, admin, organization, and hospital, each with specific functionalities. Let's break down how each role operates within the system and how the backend is designed to support these roles.

Step-by-Step Analysis:
1. Donor:
Functionality: A donor is responsible for donating blood. The donor can check their details and view their donation history.
How it Works:
A donor role is registered via the authRoutes.js (/register route).
The donor can log in through the loginController and get a JWT token for authentication.
The donor can donate blood via the create-inventory route (/create-inventory) in inventoryRoute.js, where they will be linked to the inventory of donated blood.
In inventoryModel.js, the inventoryType is set to "in" (denoting a donation), and the donar field refers to the donor's ID.
Once the blood is added, the donar can check the blood group, quantity, and organization (where it’s stored) using the get-donars endpoint (/get-donars) in inventoryRoute.js.
2. Admin:
Functionality: The admin manages the system, overseeing organizations, hospitals, and donors, with privileges to remove donors or check lists.
How it Works:
An admin is also registered through the authRoutes.js, but with the role set to "admin".
Admin middleware ensures that the user has the admin role (adminMiddleware.js).
The admin can access donor, hospital, and organization lists via:
GET /donar-list (see donor list)
GET /hospital-list (see hospital list)
GET /org-list (see organization list)
These routes are defined in adminRoute.js and use the getDonarsListController, getHospitalListController, and getOrgListController.
The admin can also delete a donor from the system using the DELETE /delete-donar/:id route.
The deleteDonarController function in adminController.js handles this by removing the donor from the system.
3. Organization:
Functionality: Organizations manage blood donation events and can receive blood for storage and distribution.
How it Works:
Organizations are registered with the role "organization" in userModel.js.
They can create new blood inventories through the create-inventory route, similarly to donors, but they are responsible for storing the donated blood.
In inventoryModel.js, the organisation field refers to the organization handling the blood. The organization doesn’t donate, but rather manages the blood supply.
Organizations can access their blood records via the get-orgnaisation (/get-orgnaisation) route in inventoryRoute.js, handled by getOrgnaisationController in inventoryController.js.
4. Hospital:
Functionality: Hospitals request and receive blood from the blood bank (organization) for patients.
How it Works:
Hospitals are registered with the role "hospital" via authRoutes.js.
Hospitals do not donate but request blood from the blood bank. When blood is removed from the inventory, the inventoryType is marked as "out".
In inventoryModel.js, the hospital field links the hospital receiving the blood.
Hospitals can access inventory via:
POST /get-inventory-hospital to see the blood allocated to their hospital.
The getInventoryHospitalController in inventoryController.js handles fetching the hospital's records.
Hospitals can also see lists of available blood through GET /get-hospitals.
How We Achieve This:
Role-Based Access Control:

Roles are managed via the userSchema in userModel.js, where each user is assigned a role upon registration.
Middlewares such as authMiddleware.js and adminMiddleware.js are used to enforce permissions based on roles.
Inventory Management:

Blood inventory is handled by the inventorySchema in inventoryModel.js. Blood donations (inventoryType: 'in') are linked to donors and organizations, while blood requisitions (inventoryType: 'out') are linked to hospitals.
The system can track blood types, quantities, and relevant associations with donors, hospitals, and organizations.
APIs:

REST APIs are built to allow interaction with the system, ensuring that authenticated and authorized users access the correct data for their role.
By segregating these roles and using well-defined controllers, routes, and middlewares, the project efficiently handles the blood bank system.