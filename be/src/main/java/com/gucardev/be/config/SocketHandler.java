package com.gucardev.be.config;

import com.corundumstudio.socketio.SocketIOServer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class SocketHandler {

  private final SocketIOServer server;

  public SocketHandler(SocketIOServer server) {
    this.server = server;
    server.addListeners(this);
    server.start();
  }
}
