"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";



export default function Home() {
  const router=useRouter();
  router.push('/dashboard')
  return (
   <div>
    <h1>Hello</h1>

   </div>
  );
}
