import { MainScreen } from "@/src/components/MainScreen";
import { UsersList } from "@/src/components/UsersList";

export default function HomeTab() {
  return (
    <MainScreen>
      <UsersList />
    </MainScreen>
  );
}
