import { DATE_OPTIONS } from "@/features/home/data/home";
import useDateRange from "@/features/home/hooks/use-date-selector";
import { formatDate } from "@/lib/utils";
import { AntDesign } from "@expo/vector-icons";

import { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

export function DateSelector({ selectedFilter }: { selectedFilter: string }) {
  const {
    startDate,
    endDate,
    open,
    modalVisible,
    setModalVisible,
    setOpen,
    setStartDate,
    setEndDate,
    handlePreviousPeriod,
    handleNextPeriod,
    setSelectedDateType,
    selectedDateType,
    handleDateChange,
    onChangeDate,
    handleCustomDateSelect,
  } = useDateRange();

  const [isCustomRange, setIsCustomRange] = useState(false);
  const [customDatePickerVisible, setCustomDatePickerVisible] = useState(false);

  const toggleCustomRangeView = () => {
    setIsCustomRange(!isCustomRange);
  };

  const formatCustomDate = (date: Date) => {
    return date
      .toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "/");
  };

  const openCustomDatePicker = (dateType: "start" | "end") => {
    setSelectedDateType(dateType);
    setCustomDatePickerVisible(true);
  };

  //   const handleCustomDateChange = (event: DateTimePickerEvent, date?: Date) => {
  //     setCustomDatePickerVisible(false);
  //     if (date) {
  //       if (selectedDateType === "start") {
  //         setStartDate(date);
  //       } else {
  //         setEndDate(date);
  //       }
  //     }
  //   };

  return (
    <View className="flex-row items-center justify-between rounded-lg">
      <>
        <View className="flex-row items-center gap-x-2 flex-1">
          <TouchableOpacity onPress={handlePreviousPeriod}>
            <AntDesign name="caret-left" size={16} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="flex-col"
          >
            <Text className="text-white text-sm">
              {formatDate(startDate, selectedFilter)}
            </Text>
            {selectedFilter === "Mingguan" && (
              <Text className="text-white text-sm">
                {formatDate(endDate, selectedFilter)}
              </Text>
            )}
          </TouchableOpacity>

          {/* {open && (
            <DateTimePicker
              value={selectedDateType === "start" ? startDate : endDate}
              mode="date"
              display="default"
              minimumDate={new Date(2000, 0, 1)}
              maximumDate={new Date(2030, 11, 31)}
              onChange={(event, date) => onChangeDate(event, date)}
            />
          )} */}

          <TouchableOpacity onPress={handleNextPeriod}>
            <AntDesign name="caret-right" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </>

      {/* {customDatePickerVisible && (
        <DateTimePicker
          value={selectedDateType === "start" ? startDate : endDate}
          mode="date"
          display="default"
          minimumDate={new Date(2000, 0, 1)}
          maximumDate={new Date(2030, 11, 31)}
          onChange={handleCustomDateChange}
        />
      )} */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl h-4/5 w-full p-5">
            <View className="flex-row justify-between items-center mb-5">
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
              <Text className="text-lg font-bold">Atur Tanggal</Text>
              <View className="w-6"></View>
            </View>

            <ScrollView className="mb-5">
              <Text className="text-base font-normal mt-4 mb-2 text-black opacity-55">
                Semua tanggal
              </Text>

              {DATE_OPTIONS.map((option: any) => (
                <TouchableOpacity
                  key={option.id}
                  className="py-3 border-b border-gray-200"
                  onPress={() => {
                    handleCustomDateSelect(option.id);
                    if (option.id.includes("custom")) {
                      setIsCustomRange(true);
                    }
                  }}
                >
                  <Text className="text-sm font-bold text-gray-800">
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}

              <Text className="text-sm font-normal mt-4 mb-2 text-black opacity-55">
                Kustomisasi Rentang Tanggal
              </Text>

              <View className="mt-1">
                <TouchableOpacity
                  className="flex-row justify-between items-center py-3 border-b border-gray-200"
                  onPress={() => {
                    setSelectedDateType("start");
                    setOpen(true);
                    setModalVisible(false);
                    setIsCustomRange(true);
                  }}
                >
                  <Text className="text-base font-bold text-black">
                    Tanggal Mulai
                  </Text>
                  <View className="flex-row items-center">
                    <Text className="text-base text-gray-600 mr-2">
                      {formatDate(startDate, "default")}
                    </Text>
                    <AntDesign name="right" size={16} color="#555" />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-row justify-between items-center py-3 border-b border-gray-200"
                  onPress={() => {
                    setSelectedDateType("end");
                    setOpen(true);
                    setModalVisible(false);
                    setIsCustomRange(true);
                  }}
                >
                  <Text className="text-base font-bold text-black">
                    Tanggal Berakhir
                  </Text>
                  <View className="flex-row items-center">
                    <Text className="text-base text-gray-600 mr-2">
                      {formatDate(endDate, "default")}
                    </Text>
                    <AntDesign name="right" size={16} color="#555" />
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>

            <TouchableOpacity
              className="bg-blue-800 rounded-xl py-3 items-center mt-2"
              onPress={() => {
                setModalVisible(false);
                if (
                  selectedDateType === "start" ||
                  selectedDateType === "end"
                ) {
                  setIsCustomRange(true);
                }
              }}
            >
              <Text className="text-white text-base font-bold">OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
