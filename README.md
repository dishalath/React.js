* Design Details 
Data Structure Design 
For the Feastful Delights application, we designed the following core data structures:

1. Product Data Model:
   ![image alt]()
Figure 5.2.1 Product Data Model

3. User Data Model:
    ![image alt]()
Figure 5.2.2 User Data Model

5. Order Data Model:
   ![image alt]()
Figure 5.2.3 Order Data Model 

* Process Design 
The core processes in the Feastful Delights application were designed as follows: 
1. Product Discovery Flow: 
○ User lands on homepage with featured products and categories 
○ User navigates through categories or uses search functionality 
○ Product listing pages show filtered results with pagination 
○ Product detail view displays comprehensive information

3. Shopping Cart Flow: 
○ User adds products to cart with quantity selection 
○ Cart summary updates in real-time with item count and total amount 
○ User can modify quantities or remove items from cart 
○ Cart persists across sessions using local storage

4. Checkout Process: 
○ User proceeds to checkout from cart page 
○ User selects/adds delivery address 
○ User chooses delivery slot 
○ User selects payment method 
○ Order summary is displayed for confirmation 
○ Order is placed and confirmation is shown

5. User Authentication Flow: 
○ Guest users can browse products and add to cart 
○ Registration/login required for checkout 
○ Social login options for streamlined authentication 
○ Password reset and account recovery flows

* Interface Design 
● Inputs: 
○ User can directly Login to the site for ordering and add the items to the bags. 
○ Customers search and filter the items and add the items into their bags . 
○ Users interact with buttons, forms, and selection options to update preferences and receive recommendations. 
● Outputs: 
○ Customers receive real-time updates on the prices of their items in the cart and pay their amounts.. 
○ Owners can also give the feedback of the items listed in the website for the recommendation to the other users. 


   ![image alt]()
Figure 5.3.1 Main Page 


   ![image alt]()
Figure 5.3.2 Product Details Page  


   ![image alt]()
Figure 5.3.3  Shipping Address Page 
                                                                

   ![image alt]()
Figure 5.3.4 Admin /User Login Page 


   ![image alt]()
Figure 5.3.5 Admin /User Register Page 


   ![image alt]()
Figure 5.3.6 Contact Us Page


   ![image alt]()
Figure 5.3.7 About Us Page 


* State Transition 
The state transition diagram for the primary user journey in the Feastful Delights 
application follows these key states: 
1. Product Browsing State: 
○ Initial state when user enters the application 
○ Transitions to Product Detail state when user selects a product 
○ Transitions to Search Results state when user performs a search 
○ Transitions to Category View state when user selects a category

3. Product Detail State: 
○ Displays comprehensive information about a selected product 
○ Transitions to Cart state when user adds product to cart 
○ Returns to previous state when user navigates back

4. Cart State: 
○ Shows all products added by the user 
○ Transitions to Checkout state when user proceeds to checkout 
○ Returns to Product Browsing state when user continues shopping
 
5. Checkout State: 
○ Multi-step process with address selection, delivery scheduling, and payment 
○ Transitions to Order Confirmation state upon successful payment 
○ Returns to Cart state if user abandons checkout
 
6. Order Confirmation State: 
○ Displays order summary and confirmation details 
○ Transitions to Order Tracking state for order status updates 
○ Transitions to Product Browsing state for continued shopping

* Forms and Reports 
Key Interface Components 
● Admin Dashboard Navigation: The Feastful Delights admin interface features a   
● consistent green header with navigation menu including Home, User, Categories, Product, Contact, Order, and Logout options, providing easy access to all administrative functions. 
● Categories Management Interface (Image 1 & 3): 
○ Tabular layout displaying category information including Name, Description, Creation date, and Image 
○ Action buttons for editing and deleting categories 
○ "Add Category" modal form with fields for Category Name, Description, and Image upload 
○ Clean, responsive design with clear section headings

● Product Management Interface (Image 2): 
○ Product listing in tabular format showing Name, Description, and other details 
○ "Add Product" modal form with comprehensive input fields: 
■ Product Name and Price fields 
■ Multi-line Description textarea 
■ Image upload capability (requires 2 images) 
■ Category selection dropdown 
■ Inventory management with Stock quantity field 
■ Special offer percentage input 
■ Form validation with required fields 
■ Clear "Create product" submission button 

● User Management Interface (Image 4): 
○ User listing displaying Name and Email information 
○ Delete functionality for user account management 
○ Clean, minimalist design focused on essential information 

● Administrative Controls: 
○ Consistent UI elements across all management interfaces 
○ Modal forms for adding new items with clear input validation 
○ Responsive design working on localhost development environment 
○ Footer with copyright information and navigation sections 

These interface components demonstrate the implementation of the component-based architecture described in system design, with reusable UI elements and a consistent design language throughout the administrative dashboard. 


Figure 5.3.2.1 Admin Order History Page 


Figure 5.3.2.2  Admin New Product Adding Page 


Figure 5.3.2.3  Admin New Category Adding Page 


Figure 5.3.2.4  Admin Check User Page

* Security Considerations 
Authentication Security: 
● JWT (JSON Web Tokens) for secure user authentication 
● Password hashing using encrypt with appropriate salt rounds 
● CSRF (Cross-Site Request Forgery) protection 
● Session timeout and automatic logout after inactivity

Data Protection: 
● SSL/TLS encryption for all data transmission 
● Sensitive user data encrypted in storage 
● Input validation on all forms to prevent injection attacks 
● Output encoding to prevent XSS (Cross-Site Scripting) 

Payment Security: 
● Integration with PCI-DSS compliant payment gateways 
● Tokenization of payment card information 
● No storage of complete card details on application servers 
● 3D Secure authentication for card payments when available 

Access Control: 
● Role-based permissions system (Customer, Admin, Manager) 
● Principle of least privilege for admin functionality 
● IP-based login monitoring for suspicious activity 
● Two-factor authentication for admin access 

API Security: 
● Rate limiting to prevent abuse 
● API key authentication for third-party integrations 
● Input validation on all API endpoints 
● Proper error handling to avoid information leakage

* Results 
The implementation of the feastful delightt website resulted in the following deliverables: 
Core Modules Implemented: 
1. User Authentication System: 
○ Registration/login functionality with email and social auth integration 
○ Password recovery flow 
○ Profile management with address book 
○ Session management with JWT tokens 
○ Role-based access control (Customer, Admin, Store Manager)

3. Product Catalog: 
○ Dish detail pages with ingredients, nutritional information, and customer reviews 
○ Related food recommendations and "frequently ordered together" suggestions 
○ Recipe search functionality with auto-suggestion and ingredient filters

5. Shopping Cart System: 
○ Add/remove products with quantity adjustment 
○ Cart persistence across sessions 
○ Price calculation with tax and discount application 
○ Save for later functionality 
○ Cart summary with visual indicators

6. Checkout Process: 
○ Multi-step checkout flow (cart review, address, delivery, payment, confirmation) 
○ Address management with Google Maps integration 
○ Delivery slot selection with date and time picker 
○ Multiple payment method integration (Credit/Debit cards, UPI, Wallets) 
○ Order summary with itemized breakdown

7. Admin Dashboard: 
○ Food Sales overview with daily, weekly, and monthly metrics 
○ Inventory management interface with stock alerts 
○ Order management system with status tracking 
○ Customer database with search and filter capabilities 
○ Promotional tools for discounts and offers 
○ Analytics dashboard with key performance indicators
