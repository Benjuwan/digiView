import { Header } from "./components/Header";
import { DigiComponent } from "./components/DigiComponent";
import { Footer } from "./components/Footer";

export const App = () => {
  const basicStyle: object = {
    'textAlign': 'center'
  }

  return (
    <>
      <Header style={basicStyle} />
      <DigiComponent />
      <Footer style={basicStyle} />
    </>
  );
}