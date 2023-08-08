# HungerZero - Removing Hunger from Society

[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/shrinishant/HungerZero?logo=github&style=for-the-badge)](https://github.com/shrinishant/) 
[![GitHub last commit](https://img.shields.io/github/last-commit/shrinishant/HungerZero?style=for-the-badge&logo=git)](https://github.com/shrinishant/)
[![Code size](https://img.shields.io/github/languages/code-size/shrinishant/HungerZero?style=for-the-badge)](https://github.com/shrinishant/HungerZero)
[![Languages](https://img.shields.io/github/languages/count/shrinishant/HungerZero?style=for-the-badge)](https://github.com/shrinishant/HungerZero)
[![Top](https://img.shields.io/github/languages/top/shrinishant/HungerZero?style=for-the-badge&label=Top%20Languages)](https://github.com/shrinishant/HungerZero)
[![Issues](https://img.shields.io/github/issues/shrinishant/HungerZero?style=for-the-badge&label=Issues)](https://github.com/shrinishant/HungerZero)

##

  ![HungerZero](https://github.com/shrinishant/HungerZero/assets/74295596/812ae7c1-1323-4598-aaa5-fad529f8ff80)

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

- Donators can donate Food:
  
  ![Screenshot (550)](https://github.com/shrinishant/HungerZero/assets/74295596/9c7045a8-5c82-44f6-8018-7cde93b8918c)


- All Donations of Donator:
  
    ![Screenshot (549)](https://github.com/shrinishant/HungerZero/assets/74295596/37503b4f-91f9-4d17-88fe-ae21205dbe60)


- Users can find All Foods and request for the same:
  
    ![Screenshot (552)](https://github.com/shrinishant/HungerZero/assets/74295596/f84ab421-54ab-4267-b4a3-22f7ee7f8ec4)


- Users can find their requested foods with the status of rejected, delivered or accepted:
  
    ![Screenshot (553)](https://github.com/shrinishant/HungerZero/assets/74295596/c7b790af-8388-40e4-af68-2de174c016aa)

- Donators can find all the Requests received:
  
    ![Screenshot (551)](https://github.com/shrinishant/HungerZero/assets/74295596/eb6a5965-993d-4f22-be84-e13c8c86bcc8)

- If the user is not logged in then they cannot access any pages except for the All Foods page to see all the available foods as shown below:
  
    ![Untitled design](https://github.com/shrinishant/HungerZero/assets/74295596/c219c08a-236e-4488-a18d-caaf4a27417a)


## Contributions

Contributions and feedback are highly appreciated! If you encounter any issues, have new ideas, or want to contribute, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or collaboration opportunities, you can reach me at: nishantkumaranaspiringiitian@gmail.com

Let's unite to combat food waste and hunger! Together, we can build a sustainable future.
