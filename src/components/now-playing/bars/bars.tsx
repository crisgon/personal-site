import "./style.css";

export function Bars() {
  return (
    <div className="flex items-center gap-1" id="music">
      <div className="bar bg-white h-2 w-1 rounded-lg m-1"></div>
      <div className="bar bg-white h-2 w-1 rounded-lg m-1"></div>
      <div className="bar bg-white h-2 w-1 rounded-lg m-1"></div>
    </div>
  );
}
