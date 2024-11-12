import React from "react";
import { useAddHistoryLogic } from "../hooks/useAddHistoryLogic";

const AddHistory = React.memo(({ Edit, setEdit }) => {
  const { history, setHistory, handleKeyDown } = useAddHistoryLogic(setEdit);

  return (
    <div>
      <section id="history">
        <form className="formHistory">
          <p id="myHistory">Minha história</p>
          {Edit ? (
            <textarea
              onChange={(e) => setHistory(e.target.value)}
              onKeyDown={handleKeyDown}
              id="newHistory"
              name="History"
              value={history}
              placeholder="Adicione sua história"
            />
          ) : (
            <p
              style={{
                color: "#D1D5DB",
                marginLeft: "64px",
                fontSize: "24px",
                fontWeight: "700",
              }}
            >
              {history === "" ? "Não há nenhuma história pra contar" : history}
            </p>
          )}
        </form>
      </section>
    </div>
  );
});

export default AddHistory;
