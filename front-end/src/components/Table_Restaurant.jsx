const Table_Restaurant = ({ data }) => {
    return (
        <table>
            <tbody>
            <div className={"list-label"}>
                <th>Nom</th>
                <th>Numéro de Téléphone</th>
                <th>Ville</th>
                <th>Adresse</th>
                <th>Spécialités</th>
                <th>Prix</th>
                <th>Note</th>
                <th>Description</th>
                <th>Image</th>
                <th></th>
            </div>
            {data.map((item) => (
                <tr key={item.id}>
                    <div className={"list-items"}>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.city}</td>
                    <td>{item.adresse}</td>
                    <td>{item.speciality}</td>
                    <td>{item.prix}</td>
                    <td>{item.note}</td>
                    <td>{item.description}</td>
                    <td>
                        <img height="144" width="256" src={`${process.env.PUBLIC_URL}/assets/img/resto/${item.img}`}
                             alt={`/asset/img/resto/${item.img}`}/>
                    </td>
                    <button>{"Réservez"}</button>
                </div>
                    </tr>

                    ))}
                </tbody>
                </table>
                );
            };

            export default Table_Restaurant;