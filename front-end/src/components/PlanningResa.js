import React from "react";

const PlanningResa = ({ layout, message, remainingPlaces, totalPlaces }) => {
  return (
    <div className="planningResa">
      <div>{message}</div>
      <div className="planningInfo">
        <div className="remainingPlaces">
          Places restantes : {remainingPlaces}
        </div>
        <div className="totalPlaces">Places totales : {totalPlaces}</div>
      </div>
      {layout.map((tableRow, rowIndex) => {
        return (
          <>
            <div key={rowIndex} className="planningRow">
              {tableRow.map((table, tableIndex) => {
                return (
                  <div key={tableIndex} className="planningCol">
                    <div className="chairsUp">
                      {Array(Math.ceil(table.placeTotal / 2))
                        .fill(null)
                        .map((_, i) => (
                          <div key={i} className="chair"></div>
                        ))}
                    </div>
                    <div
                      className={
                        table.resa ? "table reserved" : "table notReserved"
                      }
                    >
                      <p>T {tableIndex + 1}</p>
                      <p>
                        Chairs {table.placeUse}/{table.placeTotal}
                      </p>
                      <p>{table.resa ? table.lastname : "libre"}</p>
                    </div>
                    <div className="chairsDown">
                      {Array(Math.ceil(table.placeTotal / 2))
                        .fill(null)
                        .map((_, i) => (
                          <div key={i} className="chair"></div>
                        ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        );
      })}
    </div>
  );
};

export default PlanningResa;
