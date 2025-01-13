import AccountCard from "@/components/account/AccountCard";
interface HomeType{
  searchParams: Promise<{ [key: string]: string }>;
}
export default function Home({searchParams}:HomeType) {
  return (
    <main>
      <AccountCard searchParams={searchParams}/>
    </main>
  );
}
