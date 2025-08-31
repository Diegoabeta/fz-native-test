import { TextField } from "@/src/components/TextField";
import { Colors } from "@/src/constants/colors";
import { GENDER_OPTIONS, TITLE_OPTIONS } from "@/src/constants/forms";
import { formatDateInput } from "@/src/uitls/formatting";
import { isDate, isEmail, isNameValid, isPhone } from "@/src/uitls/validation";
import { Feather, FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, Pressable, ScrollView, View } from "react-native";
import { TextInput } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import { useUsers } from "../contexts/users";
import { IUserData } from "../services/userService";
import { Button } from "./Button";
import { Header } from "./Header";

interface IUserField {
  name: string;
  label: string;
  icon: React.ReactNode;
  disabled?: boolean;
  type: "text" | "dropdown";
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  maxLength?: number;
  options?: { label: string; value: string }[];
  validate?: (value: string | undefined) => boolean;
  format?: (value: string) => string;
}

const userFields: IUserField[] = [
  {
    name: "id",
    label: "ID",
    icon: <Feather name="key" size={20} color={Colors.dark} />,
    disabled: true,
    type: "text",
    keyboardType: "default",
  },
  {
    name: "title",
    label: "Título",
    icon: <Feather name="book" size={20} color={Colors.dark} />,
    type: "dropdown",
    options: TITLE_OPTIONS,
  },
  {
    name: "firstName",
    label: "Nombres",
    icon: <Feather name="edit-3" size={20} color={Colors.dark} />,
    type: "text",
    keyboardType: "default",
    validate: isNameValid,
  },
  {
    name: "lastName",
    label: "Apellidos",
    icon: <Feather name="edit-3" size={20} color={Colors.dark} />,
    type: "text",
    keyboardType: "default",
    validate: isNameValid,
  },
  {
    name: "gender",
    label: "Género",
    icon: <Feather name="users" size={20} color={Colors.dark} />,
    type: "dropdown",
    options: GENDER_OPTIONS,
  },
  {
    name: "email",
    label: "Correo",
    icon: <Feather name="mail" size={20} color={Colors.dark} />,
    type: "text",
    keyboardType: "email-address",
    validate: isEmail,
  },
  {
    name: "dateOfBirth",
    label: "Fecha de Nacimiento DD/MM/AAAA",
    icon: <Feather name="calendar" size={20} color={Colors.dark} />,
    type: "text",
    keyboardType: "numeric",
    format: formatDateInput,
    maxLength: 10,
    validate: isDate,
  },
  {
    name: "phone",
    label: "Teléfono",
    icon: <Feather name="phone" size={20} color={Colors.dark} />,
    type: "text",
    keyboardType: "phone-pad",
    maxLength: 10,
    validate: isPhone,
  },
];

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

interface IProps {
  defaultValues: IUserData;
  editable: boolean;
  title: string;
  isCreateUser?: boolean;
}

export const UserForm: React.FC<IProps> = ({
  defaultValues,
  editable,
  title,
  isCreateUser = false,
}) => {
  const [isEditable, setIsEditable] = useState(editable);
  const { addUser, updateUser } = useUsers();
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const handleSave = async (data: IUserData) => {
    if (isCreateUser) {
      await addUser(data);
      reset();
    } else {
      await updateUser(data.id, data);
      setIsEditable(false);
    }
  };

  const renderFields = (field: IUserField) => (
    <Controller
      key={field.name}
      control={control}
      name={field.name as keyof typeof defaultValues}
      rules={{ required: true, validate: field.validate }}
      render={({ field: { onChange, value }, fieldState: { error } }) =>
        field.type === "dropdown" ? (
          <Dropdown
            label={field.label}
            placeholder="Seleccione"
            options={field.options || []}
            value={value}
            disabled={!isEditable}
            onSelect={isEditable ? onChange : undefined}
            mode="outlined"
            CustomDropdownInput={() => (
              <TextField
                error={!!error}
                label={field.label}
                value={
                  value
                    ? (field.options || []).find((o) => o.value === value)
                        ?.label
                    : ""
                }
                left={<TextInput.Icon icon={() => field.icon} />}
                editable={isEditable}
                style={{ marginTop: 16 }}
              />
            )}
          />
        ) : (
          <TextField
            keyboardType={field.keyboardType || "default"}
            label={field.label}
            value={value}
            maxLength={field.maxLength ? field.maxLength : 50}
            onChangeText={
              field.format ? (text) => onChange(field.format!(text)) : onChange
            }
            error={!!error}
            left={<TextInput.Icon icon={() => field.icon} />}
            editable={isEditable && !field.disabled}
          />
        )
      }
    />
  );

  const headerSection = (
    <View className="flex-row items-center justify-between px-4 pt-6 mb-3">
      <Header text={title} />
      {!isCreateUser && (
        <Pressable
          onPress={() => setIsEditable((prev) => !prev)}
          className={`active:opacity-60 ${isEditable ? "bg-light-green" : "bg-grey-3"} rounded-full h-16 w-16 flex items-center justify-center`}
        >
          <Feather name="edit" size={20} color="white" />
        </Pressable>
      )}
    </View>
  );

  const userImage = !!defaultValues.picture ? (
    <Image
      className="w-52 h-52 rounded-2xl border border-red-500 m-auto"
      source={{ uri: defaultValues.picture }}
    />
  ) : (
    <View className="w-52 h-52 rounded-2xl border border-grey-1 bg-white justify-center items-center m-auto">
      <FontAwesome name="user" size={160} color={Colors.grey4} />
    </View>
  );

  const ctas = (
    <>
      {isEditable && isValid && (
        <Button
          onPress={handleSubmit(handleSave)}
          disabled={!isValid}
          label="Guardar"
          type={isValid ? "confirm" : "cancel"}
        />
      )}
      {isEditable && isCreateUser && (
        <Button
          onPress={() => reset()}
          disabled={!isValid}
          label="Cancelar"
          type="cancel"
        />
      )}
    </>
  );

  return (
    <ScrollView
      contentContainerStyle={{ gap: 16, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {headerSection}
      {userImage}
      <View className="bg-off-white p-6 mx-3 flex gap-4 rounded-3xl mb-12">
        {userFields
          .filter((f) => !(isCreateUser && f.name === "id"))
          .map(renderFields)}
        {ctas}
      </View>
    </ScrollView>
  );
};
