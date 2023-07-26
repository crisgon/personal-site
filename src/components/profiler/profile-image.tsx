import Image from "next/image";

export function ProfileImage() {
  return (
    <div className="w-20 h-20 rounded-full overflow-hidden">
      <Image
        src="/cristiano.jpg"
        alt="Foto do Cristiano, autor do site"
        width={80}
        height={80}
      />
    </div>
  );
}
