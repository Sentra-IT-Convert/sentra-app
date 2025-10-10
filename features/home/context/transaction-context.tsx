// import { createContext, useContext, useState } from "react";

// type DialpadContextType = {
//   description: string;
//   type: string;
//   audio: any;
//   nominal: string;
//   title: string;
//   selectedDate: Date;
//   setDescription: (value: string) => void;
//   setAudio: (value: any) => void;
//   setNominal: (value: string | ((prevNominal: string) => string)) => void;
//   setType: (value: string) => void;
//   setTitle: (value: string) => void;
//   setSelectedDate: (value: Date) => void;
//   resetDialpad: () => void;
//   icon: React.ReactNode;
//   setIcon: (value: React.ReactNode) => void;
// };

// export const DialpadContext = createContext<DialpadContextType | undefined>(
//   undefined
// );

// export const DialpadProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [description, setDescription] = useState<string>("");
//   const [audio, setAudio] = useState<any>(null);
//   const [nominal, setNominal] = useState<string>("");
//   const [type, setType] = useState<string>("");
//   const [title, setTitle] = useState<string>("");
//   const [category, setCategory] = useState<string>("");
//   const [selectedDate, setSelectedDate] = useState<Date>(new Date());
//   const [icon, setIcon] = useState<React.ReactNode>(null);

//   const resetDialpad = () => {
//     setNominal("");
//     setDescription("");
//     setSelectedDate(new Date());
//     setAudio("");
//     setIcon(null);
//   };

//   const value = {
//     description,
//     setDescription,
//     audio,
//     setAudio,
//     selectedDate,
//     setSelectedDate,
//     nominal,
//     setNominal,
//     type,
//     setType,
//     title,
//     setTitle,
//     resetDialpad,
//     setIcon,
//     icon,
//   };

//   return (
//     <DialpadContext.Provider value={value}>{children}</DialpadContext.Provider>
//   );
// };

// export const useDialpad = () => {
//   const context = useContext(DialpadContext);
//   if (!context) {
//     throw new Error("useDialpad must be used within a DialpadProvider");
//   }
//   return context;
// };
