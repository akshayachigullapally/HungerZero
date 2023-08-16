# HungerZero - Removing Hunger from Society

[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/shrinishant/HungerZero?logo=github&style=for-the-badge)](https://github.com/shrinishant/) 
[![GitHub last commit](https://img.shields.io/github/last-commit/shrinishant/HungerZero?style=for-the-badge&logo=git)](https://github.com/shrinishant/)
[![Code size](https://img.shields.io/github/languages/code-size/shrinishant/HungerZero?style=for-the-badge)](https://github.com/shrinishant/HungerZero)
[![Languages](https://img.shields.io/github/languages/count/shrinishant/HungerZero?style=for-the-badge)](https://github.com/shrinishant/HungerZero)
[![Top](https://img.shields.io/github/languages/top/shrinishant/HungerZero?style=for-the-badge&label=Top%20Languages)](https://github.com/shrinishant/HungerZero)
[![Issues](https://img.shields.io/github/issues/shrinishant/HungerZero?style=for-the-badge&label=Issues)](https://github.com/shrinishant/HungerZero)

![Alt text](https://drive.google.com/file/d/13I46B2P6BKSl5XSZI16cBmV2Ia3wPXQ7/view?usp=sharing)


## Table of Contents

- [HungerZero - Removing Hunger from Society](#hungerzero---removing-hunger-from-society)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Getting Started](#getting-started)
  - [Usage](#usage)
  - [Demo](#demo)
  - [Contributions](#contributions)
  - [License](#license)
  - [Contact](#contact)

## Introduction

The Surplus Food Management Platform is a web application developed to address the challenge of food waste and hunger. The platform connects food donors, such as restaurants and grocery stores, with local food banks and shelters to efficiently distribute surplus food. The project was built with a focus on sustainability and reducing food waste to achieve the goal of "Zero Hunger, Zero Waste."

## Features

- User-friendly interface for easy food donation and request process.
- Real-time updates and notifications for food donors and recipients.
- Secure authentication and data storage with Appwrite services.
- Automated scheduling and task management for removing expired food listings.
- Dashboard for administrators to manage and track food donation activities.

## Technologies Used

- Frontend: Next.js
- Backend: Appwrite (Authentication, Database, and Functions)
- Styling: CSS modules, Material-UI
- Hosting: Vercel (Frontend), Appwrite (Backend)
- Additional Services: Email notifications (Appwrite Functions)
- Cloud Functions: [Associated Repository](https://github.com/shrinishant/CloudFunctions-HungerZero)
## Getting Started

To run the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/shrinishant/HungerZero.git`

2. Create `.env.local` file to the root directory of the Project with following variables:

    - `NEXT_PUBLIC_PROJECT_ID=<Your Appwrite Project ID>`
    - `NEXT_PUBLIC_BUCKET_ID=<Your Appwrite Bucket ID>`
    - `NEXT_PUBLIC_DATABASE_ID=<Your Appwrite Database ID>`
    - `NEXT_PUBLIC_COLLECTION_ID=<Your Appwrite Collection ID>`
    - `NEXT_PUBLIC_COLLECTION_ID_PICKUP=<Your Appwrite Collection ID>`
    - `NEXT_PUBLIC_FUNCTION_ID_PICKUP_UPDATE=<Your Appwrite Function ID>`
    - `NEXT_PUBLIC_FUNCTION_ID_REGISTRATION_EMAIL=<Your Appwrite Function ID>`

2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

Ensure you have the necessary environment variables set for the Appwrite project configuration.

## Usage

1. Food Donors can create listings for surplus food with details like quantity, expiry date, and pick-up location.
2. Food Banks and Shelters can browse available food listings and request pick-up.
3. Real-time notifications keep both donors and recipients updated about the status of food donations.
4. Scheduled cron jobs automatically remove expired food listings from the platform.

## Demo

- If the user is not logged in then they cannot access any pages except for the All Foods page to see all the available foods as shown below:

    ![Not Logged In Gif](https://drive.google.com/file/d/1LwArH8VvN_KpUi70mSCA9NmSP9zWynZj/view?usp=sharing)

- Donators can donate Food:
    ![Donate Food](https://drive.google.com/file/d/178EbxXKLu18vFjnj-mqB9I1wsbJ_bPrQ/view?usp=sharing)

- All Donations of Donator:
    ![Donated Foods](https://drive.google.com/file/d/1im4ITgQqG_tmz5AJB7MiOC4zUmgF5w9b/view?usp=sharing)

- Users can find All Foods and request for the same:
    ![All Foods](https://drive.google.com/file/d/1BJ9uO_W4uEb9HRLWSDc0EXkgzJtzPHIO/view?usp=sharing)

- Users can find their requested foods with the status of rejected, delivered or accepted:
    ![Requested Foods](https://drive.google.com/file/d/1g-wae7MLVckYYUMnSWFrT99_oOVvxxIh/view?usp=sharing)

- Donators can find all the Requests received:
    ![Manage Pickups](https://drive.google.com/file/d/18rijD11QPOK9b3sV18ZBEGo84uYumKvE/view?usp=sharing)

## Contributions

Contributions and feedback are highly appreciated! If you encounter any issues, have new ideas, or want to contribute, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or collaboration opportunities, you can reach me at: nishantkumaranaspiringiitian@gmail.com

Let's unite to combat food waste and hunger! Together, we can build a sustainable future.