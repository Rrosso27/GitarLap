import Header from "./components/Header";
import Gitar from "./components/Gitar";
import { db } from "./api/db";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const itialCarrito = () => {
    const local = localStorage.getItem("carrito");
    return local ? JSON.parse(local) : [];
  };
  const [produt] = useState(db);
  const [carrito, setCarrito] = useState(itialCarrito());
  const MAS_ITEMS = 5;

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  function addCarrito(item) {
    console.log(carrito);
    const itemExist = carrito.findIndex((e) => e.id === item.id);
    if (itemExist >= 0) {
      const updateCar = [...carrito];
      if (updateCar[itemExist].cantidad == MAS_ITEMS) {
        alert("No puedes agregar mas de 5 guitarras");
      } else {
        updateCar[itemExist].cantidad++;
      }
      setCarrito(updateCar);
    } else {
      item.cantidad = 1;
      setCarrito([...carrito, item]);
    }
  }

  function sumItem(id) {
    const itemExist = carrito.findIndex((e) => e.id === id);
    const updateCar = [...carrito];
    if (updateCar[itemExist].cantidad == MAS_ITEMS) {
      alert("No puedes agregar mas de 5 guitarras");
    } else {
      updateCar[itemExist].cantidad++;
    }
    setCarrito(updateCar);
  }

  function resItem(id) {
    const itemExist = carrito.findIndex((e) => e.id === id);
    const updateCar = [...carrito];

    if (updateCar[itemExist].cantidad == 1) {
      deleteItem(id);
    } else {
      updateCar[itemExist].cantidad--;
      setCarrito(updateCar);
    }
  }

  function deleteItem(id) {
    const newCar = carrito.filter((e) => e.id !== id);
    setCarrito(newCar);
  }

  function clearCard() {
    setCarrito([]);
  }

  return (
    <>
      <Header
        carrito={carrito}
        sumItem={sumItem}
        resItem={resItem}
        deleteItem={deleteItem}
        clearCard={clearCard}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {produt.map((e) => (
            <Gitar key={e.id} data={e} addCarrito={addCarrito} />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
