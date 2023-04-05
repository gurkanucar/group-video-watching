package com.gucardev.be.service;

import com.corundumstudio.socketio.SocketIOClient;
import java.util.Map;

public interface SocketService {

   void onConnect(SocketIOClient client);

  void onDisconnect(SocketIOClient client);

  void broadcastEvent(SocketIOClient client, String jsonPayload, String eventName);

  void onPlayerStateChange(SocketIOClient client, Map<String, Object> payload);

  void onSeekChange(SocketIOClient client, Map<String, Object> payload);

  void onVideoIdChange(SocketIOClient client, Map<String, Object> payload);
}
