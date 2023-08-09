const TablaDatos = ({ columnas, datos }) => {

    return (
        <>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        {columnas.map(col => (
                            <th key={col.clave} className="px-4 py-4 bg-blue-600 text-white text-left">{col.valor}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {datos.map((d) => (
                        <tr key={d.id}>
                            {columnas.map(col => (
                                <td className="border px-4 py-2">{d[col.clave]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default TablaDatos;