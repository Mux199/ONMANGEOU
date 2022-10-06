const Table_Restaurant = ({ data }) => {
    return (
        <table>
            <tbody>
            <tr>
                <th>Nom</th>
                <th>Numéro de Téléphone</th>
                <th>Adresse</th>
                <th>Spécialités</th>
                <th>Prix</th>
                <th>Image</th>
            </tr>
            {data.map((item) => (
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.adresse}</td>
                    <td>{item.Spécialité}</td>
                    <td>{item.prix}</td>
                    <td>
                        {/*<img src={`${process.env.PUBLIC_URL}/assets/img/resto/${item.img}`}
                              alt={`/asset/img/resto/${item.img}`}/>*/}
                        <img src={`../assets/img/resto/${item.img}`} alt={`/asset/img/resto/${item.img}`}/>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default Table_Restaurant;