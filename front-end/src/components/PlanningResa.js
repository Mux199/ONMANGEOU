import React from "react";

const PlanningResa = ({ layout, message, displaySensitiveInfo }) => {
  return (
    <div>
      <div>{message}</div>
      {layout.map((tableRow, rowIndex) => {
        return (
          <div key={rowIndex}>
            {tableRow.map((table, tableIndex) => {
              return (
                <div key={tableIndex}>
                  <p>
                    Table {tableIndex + 1} - Chairs {table.placeUse}/
                    {table.placeTotal}
                  </p>
                  <p>Reservation: {table.resa || "None"}</p>
                  <p>Last Name: {table.lastname}</p>
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
