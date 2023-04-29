const initialState = {
  projectModal:false,
  projectShowcase:null,
  projects:[
    {id: 1, name:'Twit Dashboard', image:'https://i.postimg.cc/2544fDtX/porto-1.png', link:'https://twit-dashboard.vercel.app/', github: 'https://github.com/fahmifachrizal/twit-dashboard', techStack:['Next.js', 'Next/Auth', 'React', 'Twitter API v2', 'Apexcharts.js', 'Vercel', 'Tailwind CSS'], description:'The website is designed to help users manage their Twitter accounts more effectively by providing a dashboard that visualizes key metrics and allows for easy monitoring of account activity. Users can view analytics, schedule posts, and engage with followers all from one central location, making it an indispensable tool for anyone looking to grow their Twitter presence.'}, 
    {id: 2, name:'Code Translate', image:'https://i.postimg.cc/rsY49Fdz/porto-2.png', link:'https://codetranslate-e25fb.web.app/', github:'https://github.com/fahmifachrizal/CodeTranslator', techStack:['OpenAI', 'ChatGPT 3.5', 'Firebase', 'React', 'Codemirror', 'Tailwind CSS'], description:'The website is designed to allow users to translate code between programming languages using OpenAI ChatGPT, an advanced natural language processing model. It can help developers to convert code written in one language to another with greater ease and accuracy. The platform provides an intuitive interface for users to interact with the model and perform the translations quickly and efficiently.'}, 
    {id: 3, name:'Inter-act', image:'https://i.postimg.cc/gkn82R5h/porto-3.png', link:'https://interact-dashboard.web.app/', github:'https://github.com/fahmifachrizal/ReactDashboard', techStack:['React', 'Apexcharts.js', 'Firebase', 'Tailwind CSS'], description:"The website is a portfolio showcasing a developer's ability to create and manage graphs and dashboards for data visualization purposes. It highlights the developer's skills and can be used by potential clients looking to collaborate or hire the developer for their own projects. The website provides examples of how the developer can apply their skills to create custom solutions for clients."}, 
    {id: 4, name:'Wanderia', image:'https://i.postimg.cc/Nf7yjRqG/porto-4.png', link:null, github:null, techStack:['React Native', 'OpenAI', 'MapsAPI', 'Express.js', 'PostgreSQL', 'MongoDB', 'Jest', 'AWS', 'Firebase'], description:"Wanderia is an AI-powered travel app that offers a user-friendly interface and personalized recommendations based on user preferences. Whether you're looking for a relaxing beach vacation or an action-packed adventure, Wanderia can help you plan, navigate, and make the most of your time away. With the integration of OpenAI's suggestion algorithm, Wanderia provides tailored recommendations for activities, restaurants, and events, ensuring an unforgettable travel experience."}, 
    {id: 5, name:'Zigzag Delivery', image:'https://i.postimg.cc/T3T3J01B/porto-5.png', link:null, github:null, techStack:['Vue', 'Pinia', 'Express.js', 'PostgreSQL', 'Jest', 'AWS', 'Firebase'], description:'This web app provides a user-friendly platform for individuals and businesses to send packages using public transportation. With real-time tracking and affordable pricing, we make package delivery accessible to all. Say goodbye to the headaches of traditional courier services and embrace the convenience and sustainability of public transportation package delivery through our web app.'}
  ],
  certificates:[
    {id:1, name:'JavaScript (Intermediate)', number:'486d9a73e07d', expiration:null, provider:'Hackerrank', date:'26 April 2023', link:'https://www.hackerrank.com/certificates/486d9a73e07d', description:'It covers topics like Design Patterns, Memory management, concurrency model, and event loops, among others.'},
    {id:2, name:'Javascript (Basic)', number:'d55057b0c9b3', expiration:null, provider:'Hackerrank', date:'26 April 2023', link:'https://www.hackerrank.com/certificates/d55057b0c9b3', description:'It covers topics like, Functions, Currying, Hoisting, Scope, Inheritance, Events and Error Handling.'},
    {id:3, name:'React (Basic)', number:'573df49f9187', expiration:null, provider:'Hackerrank', date:'27 April 2023', link:'https://www.hackerrank.com/certificates/573df49f9187', description:'React (Basic) It covers topics like Basic Routing, Rendering Elements,State Management (Internal Component State), Handling Events, ES6 and JavaScript and Form Validation.'},
    {id:4, name:'Node.JS (Basic)', number:'d47d76a0e14f', expiration:null, provider:'Hackerrank', date:'26 April 2023', link:'https://www.hackerrank.com/certificates/d47d76a0e14f', description:'It covers topics like Package and Modules Management, Callbacks, Event Loop, Event Emitter, Buffers, Streams and File Systems'},
    {id:5, name:'SQL (Intermediate)', number:'c8d2a9105bdf', expiration:null, provider:'Hackerrank', date:'02 September 2021', link:'https://www.hackerrank.com/certificates/c8d2a9105bdf', description:'It includes complex joins, unions, and sub-queries.'},
    {id:6, name:'SQL (Basic)', number:'be3f82fe5229', expiration:null, provider:'Hackerrank', date:'02 September 2021', link:'https://www.hackerrank.com/certificates/be3f82fe5229', description:'It includes simple queries, relationships, and aggregators.'},
    {id:7, name:'Python (Basic)', number:'4792303992d7', expiration:null, provider:'Hackerrank', date:'14 February 2021', link:'https://www.hackerrank.com/certificates/4792303992d7', description:'It covers topics like Scalar Types, Operators and Control Flow, Strings, Collections and Iteration, Modularity, Objects and Types and Classes'}
  ]
}

const uxReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ux/toogleModal':
      return {
        ...state,
        projectModal: action.payload.toogleModal,
        projectShowcase: (action.payload.id?state.projects.find(project=>project.id===action.payload.id):null),
      }
    default:
      return state
  }
}

export default uxReducer