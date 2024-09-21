import PropTypes from "prop-types";
import { useMemo } from "react";

export default function Header({
  carrito,
  sumItem,
  resItem,
  deleteItem,
  clearCard,
}) {
  const totalCarrito = useMemo(
    () =>
      carrito.reduce((total, item) => total + item.cantidad * item.price, 0),
    [carrito]
  );
  const ifCarrito = useMemo(() => carrito.length === 0, [carrito]);

  return (
    <>
      <header className="py-5 header">
        <div className="container-xl">
          <div className="row justify-content-center justify-content-md-between">
            <div className="col-8 col-md-3">
              <a href="index.html">
                <img
                  className="img-fluid"
                  src="./img/logo.svg"
                  alt="imagen logo"
                />
              </a>
            </div>
            <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
              <div className="carrito">
                <img
                  className="img-fluid"
                  src="./img/carrito.png"
                  alt="imagen carrito"
                />

                <div id="carrito" className="bg-white p-3">
                  <table>
                    <thead>
                      <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {carrito.map((e) => (
                        <tr key={e.id}>
                          <td>
                            <img
                              className="img-fluid"
                              src={`./public/img/${e.image}.jpg`}
                              alt="imagen guitarra"
                            />
                          </td>
                          <td>{e.name}</td>
                          <td className="fw-bold">${e.price}</td>
                          <td className="flex align-items-start gap-4">
                            <button
                              onClick={() => resItem(e.id)}
                              type="button"
                              className="btn btn-dark"
                            >
                              -
                            </button>
                            {e.cantidad}
                            <button
                              onClick={() => sumItem(e.id)}
                              type="button"
                              className="btn btn-dark"
                            >
                              +
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() => deleteItem(e.id)}
                              className="btn btn-danger"
                              type="button"
                            >
                              X
                            </button>
                          </td>
                        </tr>
                      ))}
                      {ifCarrito && (
                        <tr>
                          <td colSpan="5" className="text-center">
                            <p className="text-center">El carrito esta vacio</p>
                          </td>{" "}
                        </tr>
                      )}
                    </tbody>
                  </table>

                  <p className="text-end">
                    Total pagar:{" "}
                    <span className="fw-bold">${totalCarrito}</span>
                  </p>

                  <button
                    onClick={() => clearCard}
                    className="btn btn-dark w-100 mt-3 p-2"
                  >
                    Vaciar Carrito
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
