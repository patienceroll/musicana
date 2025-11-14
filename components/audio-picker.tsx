// components/AudioPicker.jsx
import * as FileSystem from "expo-file-system";
import React from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";

import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

import { useAudioPicker } from "@/hooks/use-audio-picker";

export function AudioPicker(props: { onAudioSelected: (audio: FileSystem.File) => void }) {
  const { onAudioSelected } = props;
  const { selectedAudio, pickAudio, isLoading, clearSelection } =
    useAudioPicker();

  const handlePickAudio = async () => {
    const audio = await pickAudio();
    if (audio && onAudioSelected) {
      onAudioSelected(audio);
    }
  };

  return (
    <ThemedView style={{ padding: 16 }}>
      <TouchableOpacity
        onPress={handlePickAudio}
        disabled={isLoading}
        style={{
          backgroundColor: "#007AFF",
          padding: 16,
          borderRadius: 8,
          alignItems: "center",
          opacity: isLoading ? 0.6 : 1,
        }}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <ThemedText
            style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}
          >
            选择音频文件
          </ThemedText>
        )}
      </TouchableOpacity>

      {selectedAudio && (
        <ThemedView
          style={{
            marginTop: 16,
            padding: 12,
            backgroundColor: "background",
            borderRadius: 8,
          }}
        >
          <ThemedText type="defaultSemiBold">已选择音频文件:</ThemedText>
          <ThemedText type="subtitle" style={{ marginTop: 4 }}>
            {selectedAudio.name}
          </ThemedText>
          <ThemedText type="subtitle">
            {(selectedAudio.size / 1024 / 1024).toFixed(2)} MB
          </ThemedText>

          <TouchableOpacity onPress={clearSelection} style={{ marginTop: 8 }}>
            <ThemedText style={{ color: "#FF3B30", fontSize: 12 }}>
              清除选择
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      )}
    </ThemedView>
  );
}
