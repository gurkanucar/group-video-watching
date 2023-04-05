package com.gucardev.be.service.impl;

import com.corundumstudio.socketio.SocketIOClient;
import com.gucardev.be.service.SocketService;
import java.util.HashMap;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class SocketServiceImpl implements SocketService {

  private static final Map<String, String> users = new HashMap<>();

  @Override
  public void onConnect(SocketIOClient client) {}

  @Override
  public void onDisconnect(SocketIOClient client) {}

  @Override
  public void broadcastEvent(SocketIOClient client, String jsonPayload, String eventName) {}

  @Override
  public void onPlayerStateChange(SocketIOClient client, Map<String, Object> payload) {}

  @Override
  public void onSeekChange(SocketIOClient client, Map<String, Object> payload) {}

  @Override
  public void onVideoIdChange(SocketIOClient client, Map<String, Object> payload) {}
}
