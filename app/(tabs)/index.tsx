// app/index.jsx
import * as FileSystem from "expo-file-system";
import React, { useState } from "react";

import { AudioPicker } from "@/components/audio-picker";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function HomeScreen() {
  const [selectedAudio, setSelectedAudio] = useState<FileSystem.File>();

  return (
    <ThemedView style={{ flex: 1, padding: 20 }}>
      <ThemedText type="title" style={{ marginBottom: 20 }}>
        音乐分析工具
      </ThemedText>

      <ThemedText type="subtitle" style={{ marginBottom: 16 }}>
        选择要分析的音频文件
      </ThemedText>

      <AudioPicker
        onAudioSelected={(audio) => {
          setSelectedAudio(audio);
          console.log("选择的音频信息:", audio);
        }}
      />

      {selectedAudio && (
        <ThemedView style={{ marginTop: 24 }}>
          <ThemedText type="defaultSemiBold">音频详细信息:</ThemedText>
          <ThemedText type="subtitle" style={{ marginTop: 8 }}>
            文件名: {selectedAudio.name}
          </ThemedText>
          <ThemedText type="subtitle">
            文件大小: {(selectedAudio.size / 1024 / 1024).toFixed(2)} MB
          </ThemedText>
          <ThemedText type="subtitle">
            文件类型: {selectedAudio.type || "未知"}
          </ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
}
