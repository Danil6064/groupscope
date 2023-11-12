import { useState } from "react";

export default function InsertLinkPopup({ setIsOpen}) {
  const [text, setText] = useState();
  const [url, setUrl] = useState();

  return (
    <div className="insert-link-popup">
      <div className="insert-link-popup__item">
        <h2>Текст</h2>
        <input
          className="insert-link-popup__input"
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="insert-link-popup__item">
        <h2>Посилання</h2>
        <input
          className="insert-link-popup__input"
          defaultValue={"http://"}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div className="insert-link-popup__item">
        <div className="insert-link-popup__btns">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="insert-link-popup__btn"
          >
            Закрити
          </button>

          <button
            type="button"
            // onClick={}
            className="insert-link-popup__btn"
          >
            Створити
          </button>
        </div>
      </div>
    </div>
  );
}
