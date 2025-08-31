import { MainScreen } from "@/src/components/MainScreen";
import { UserForm } from "@/src/components/UserForm";
import { IUserData } from "@/src/services/userService";
import { ScrollView } from "react-native";

const defaultValues: IUserData = {
  id: "",
  title: "",
  firstName: "",
  lastName: "",
  gender: "",
  email: "",
  dateOfBirth: "",
  phone: "",
};

export default function AddTab() {
  return (
    <MainScreen backgroundColor="bg-bg-green">
      <ScrollView
        contentContainerStyle={{ gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <UserForm
          defaultValues={defaultValues}
          title="Crear Usuario"
          isCreateUser
          editable
        />
      </ScrollView>
    </MainScreen>
  );
}
