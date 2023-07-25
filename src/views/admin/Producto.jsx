const Producto = () => {

    const products = [
        { id: 1, name: 'Producto 1', price: '$100.00', stock: 10 },
        { id: 1, name: 'Producto 2', price: '$100.00', stock: 10 },
        { id: 1, name: 'Producto 3', price: '$100.00', stock: 10 },
        { id: 1, name: 'Producto 4', price: '$100.00', stock: 10 },
        // Agrega más productos aquí
        // { id: 2, name: 'Producto 2', price: '$50.00', stock: 5 },
        // { id: 3, name: 'Producto 3', price: '$75.00', stock: 15 },
        // ...
      ];

    return ( <div className="container mx-auto p-8">
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="px-4 py-4 bg-blue-600 text-white text-left">Producto</th>
          <th className="px-4 py-4 bg-blue-600 text-white text-left">Precio</th>
          <th className="px-4 py-4 bg-blue-600 text-white text-left">Stock</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td className="border px-4 py-2">{product.name}</td>
            <td className="border px-4 py-2">{product.price}</td>
            <td className="border px-4 py-2">{product.stock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
    )
}
export default Producto