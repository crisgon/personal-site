"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    window.addEventListener("message", event => {
      const dataString = event.data;

      console.log("Mensagem recebida do React Native:", dataString);

      try {
        const data = JSON.parse(dataString);

        setMessage(data);

        console.log("Objeto de dados recebido:", data);

        alert("Dados chegaram" + JSON.stringify(data));
      } catch (error) {
        console.warn("Erro ao fazer parse do JSON da mensagem do RN:", error);
      }
    });

    document.addEventListener("message", event => {
      const dataString = (event as any).data;

      console.log("Mensagem recebida do React Native:", dataString);

      try {
        const data = JSON.parse(dataString);

        setMessage(data);

        console.log("Objeto de dados recebido:", data);

        alert("Dados chegaram" + JSON.stringify(data));
      } catch (error) {
        console.warn("Erro ao fazer parse do JSON da mensagem do RN:", error);
      }
    });

    console.log("Listener de mensagens do React Native pronto.");
  }, []);

  return (
    <p className="text-white">
      Dados recebidos: <br />
      {JSON.stringify(message)}
      <br />
      <br />
      <br />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium,
      similique. Error inventore, reprehenderit excepturi distinctio eum
      voluptate omnis amet maxime doloremque, id blanditiis sint fugit saepe
      mollitia labore, nobis voluptatem. Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Accusantium, similique. Error inventore, reprehenderit
      excepturi distinctio eum voluptate omnis amet maxime doloremque, id
      blanditiis sint fugit saepe mollitia labore, nobis voluptatem. Lorem ipsum
      dolor sit amet consectetur adipisicing elit. Accusantium, similique. Error
      inventore, reprehenderit excepturi distinctio eum voluptate omnis amet
      maxime doloremque, id blanditiis sint fugit saepe mollitia labore, nobis
      voluptatem. Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Accusantium, similique. Error inventore, reprehenderit excepturi
      distinctio eum voluptate omnis amet maxime doloremque, id blanditiis sint
      fugit saepe mollitia labore, nobis voluptatem. Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Accusantium, similique. Error inventore,
      reprehenderit excepturi distinctio eum voluptate omnis amet maxime
      doloremque, id blanditiis sint fugit saepe mollitia labore, nobis
      voluptatem.
    </p>
  );
}
