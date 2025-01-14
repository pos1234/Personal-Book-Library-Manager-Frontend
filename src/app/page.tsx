import AccountCard from "@/components/account/AccountCard";
import { SearchParamProps } from "@/types/util.interface";

export default function Home({searchParams}:SearchParamProps) {
  return (
    <main>
      <AccountCard searchParams={searchParams}/>
    </main>
  );
}
