import React from "react";

const PlanningResa = ({ layout, message, displaySensitiveInfo }) => {
  return (
    <div className="planningResa">
      <div>{message}</div>
      {layout.map((tableRow, rowIndex) => {
        return (
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
                  <div className="table">
                    <p>
                      Table {tableIndex + 1} - Chairs {table.placeUse}/
                      {table.placeTotal}
                    </p>
                    <p>Reservation: {table.resa || "None"}</p>
                    <p>Last Name: {table.lastname}</p>
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
        );
      })}
    </div>
  );
};

export default PlanningResa;
