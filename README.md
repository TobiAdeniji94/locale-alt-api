# LOCALE
Locale is a developer tool for anyone needing geographical information about Nigeria. This API details Nigeria's regions, states, and local government areas (LGAs). It's a useful tool for businesses targeting Nigeria's population of over 200M

# Built With
Node.js, Express, MongoDB, Redis and TypeScript

## Data Information

Locale includes the following information for each region, state, and LGA:

- **Name**: The region, state, or LGA name.
- **Landmass**: The land area covered by the region, state, or LGA, typically measured in square kilometers or miles.
- **Population**: The total number of inhabitants residing in the region, state, or LGA.
- **Dialect**: The primary language or dialect spoken by the people in the region, state, or LGA.
- **Other Relevant Information**: Additional details that are pertinent to the specific region, state, or LGA, which may include cultural aspects, historical significance, or notable landmarks.

## Usage
Locale is a valuable resource for diverse purposes, including population analysis, linguistic diversity study, cultural exploration, and administrative planning. Researchers can utilize its dataset to understand Nigerian culture and linguistic diversity across regions and states. It provides a comprehensive overview of Nigeria's geographical entities, facilitating easy access to structured information on regions, states, and LGAs.

## Base URL
[Locale](https://locale-alt-api.onrender.com)

## Getting Started

### Prerequisites

- Node.js and npm installed on your local machine. [Install](https://nodejs.org/en/download/)
- MongoDB installed on your local machine. [Install](https://docs.mongodb.com/manual/installation/)
- Redis installed on your local machine. [this link](https://redis.io/docs/getting-started/)

### API Installation

1. Clone the repository: git clone [here](https://github.com/TobiAdeniji94/locale-alt-api)
2. Install the dependencies: npm install
3. Start the development server: run `npm start` to start the server
4. Configure the environment variables: Create a .env file in the root directory of the project and add the following environment variables. Use the sample.env for reference

### Testing the server 

Read API Documentation here [Swagger Doc](https://locale-alt-api.onrender.com/documentation) 

### API Endpoints

The Locale API offers the following endpoints for integrating geographical data:

1. Get Regions: `/regions`

   This endpoint allows you to fetch the data of a specific region or retrieve information about all regions if no region name is provided. You can also include Local Government Areas (LGAs) by setting the `lga` query parameter to `true`.

2. Get States: `/states`

   Use this endpoint to retrieve the data of a specific state or obtain information about all states if no state name is provided. By setting the `lga` query parameter to `true`, you can include Local Government Areas (LGAs) in the response.

3. Get Local Government: `/lgas`

   This endpoint enables you to fetch the data of a specific Local Government Area (LGA) or retrieve information about all LGAs.
