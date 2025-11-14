// hooks/useAudioPicker.js
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { useState } from "react";

export function useAudioPicker() {
  const [selectedAudio, setSelectedAudio] = useState<FileSystem.File>();
  const [isLoading, setIsLoading] = useState(false);

  const pickAudio = async () => {
    try {
      setIsLoading(true);

      const result = await DocumentPicker.getDocumentAsync({
        type: "audio/*",
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        throw new Error("取消选择");
      }

      const audioFile = result.assets[0];

      // 获取文件信息
      const fileInfo = new FileSystem.File(audioFile.uri);

      setSelectedAudio(fileInfo);
      return fileInfo;
    } catch (error) {
      console.error("音频选择错误:", error);
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    selectedAudio,
    pickAudio,
    isLoading,
    clearSelection: () => setSelectedAudio(undefined),
  };
}
