import Image from "next/image";
import { AppBar } from "./components/Appbar/Appbar";

console.log(process.env.GOOGLE_CLIENT_ID);
console.log(process.env.GOOGLE_CLIENT_SECRET);
export default function Home() {
  return (
    <main>
      <AppBar />
    </main>
  );
}
