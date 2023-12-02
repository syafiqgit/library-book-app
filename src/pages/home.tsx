import Hero from "@/components/hero";
import NewBooks from "@/components/new-books";
import OtherBooks from "@/components/other-books";
import LayoutPage from "@/layouts/layout-page";

export default function Home() {
  return (
    <LayoutPage>
      <Hero/>
      <NewBooks />
      <OtherBooks />
    </LayoutPage>
  );
}
