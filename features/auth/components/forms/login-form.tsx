import PasswordInput from "@/components/password-input";
import { loginInput, loginSchema } from "@/features/auth/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { setBiometricCredentials } from "../../actions/biometric";
import { useLogin } from "../../hooks/use-auth";
import Biometric from "../biometric";
import CountrySelect from "../country-select";

export default function LoginForm() {
  const [dialCode, setDialCode] = useState("");
  const router = useRouter();
  const { mutate: login, isPending } = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<loginInput>({
    resolver: zodResolver(loginSchema),
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: {
      phone_number: "",
      password: "",
    },
  });

  const onSubmit = async (data: loginInput): Promise<void> => {
    const cleanDialCode = dialCode.replace("+", "");
    const fullPhoneNumber = cleanDialCode + data.phone_number;

    const payload = {
      phone_number: fullPhoneNumber,
      password: data.password,
    };

    console.log("Payload:", payload);

    await login(payload);
    await setBiometricCredentials(payload.phone_number, payload.password);
  };

  return (
    <View className="space-y-2 mx-auto pt-4 w-full">
      <View className="flex flex-row gap-x-2">
        <Controller
          control={control}
          name="country"
          render={({ field: { onChange } }) => (
            <CountrySelect
              onSelect={(code) => {
                setDialCode(code);
                onChange(code);
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="phone_number"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className={`border ${
                errors.phone_number ? "border-red-500" : "border-[#CBCBCB]"
              } flex-1 rounded-2xl mt-4 pl-5`}
              placeholder="Mobile Number"
              keyboardType="phone-pad"
              returnKeyType="done"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>

      {errors.phone_number && (
        <Text className="text-red-500 pl-2">{errors.phone_number.message}</Text>
      )}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <PasswordInput
            value={value}
            onChangeText={onChange}
            hasError={!!errors.password}
          />
        )}
      />

      {errors.password && (
        <Text className="text-red-500 pl-2">{errors.password.message}</Text>
      )}

      <TouchableOpacity
        className="mt-2 flex items-end"
        onPress={() => router.push("/forgot-password")}
      >
        <Text>Lupa kata sandi?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={isPending}
        className="bg-primary-400 py-3 rounded-2xl mt-8"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-white text-center font-bold text-lg">
          {isPending ? "Loading..." : "Login"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity className="bg-white border-2 border-[#B0B1D7] py-2 rounded-2xl mt-4">
        <View className="flex flex-row items-center justify-center gap-x-2">
          <Image source={require("../../../../assets/images/gmail.png")} />
          <Text className="text-lg font-bold text-[#B0B1D7] ml-2">
            Log in With Google
          </Text>
        </View>
      </TouchableOpacity>

      <Biometric />

      <View className="flex flex-row justify-center">
        <Text className="text-[#6A6A6A]">Belum memiliki akun? </Text>
        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text className="text-[#3629B7] font-semibold">Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
