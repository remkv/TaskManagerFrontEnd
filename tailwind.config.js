/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    backgroundImage: {
      loginBackground: "url('https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b')",
    },
    colors:{
      sidebarColor:"#f6f6fe",
      buttonColor:'#149bff',
    },
    fontFamily: {
      SourceSans3: ['Source Sans 3','sans-serif'],
    }
  },
};
export const plugins = [];
