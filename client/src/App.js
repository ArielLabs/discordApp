import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout/RootLayout";
import IntroductionPage from "./pages/IntroductionPage/IntroductionPage";
import JoinRoomPage from "./pages/JoinRoomPage/JoinRoomPage";
import RoomPage from "./pages/RoomPage/RoomPage";
import './App.css';

const routerApp = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <IntroductionPage /> },
      { path: "join-room", element: <JoinRoomPage />  }, 
      { path: "room", element: <RoomPage /> }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={routerApp} />
  );
}

export default App;
