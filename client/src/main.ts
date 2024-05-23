import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const sockJS = new SockJS('http://localhost:8080/ws');

const compatClient = Stomp.over(sockJS);

compatClient.onConnect = function(frame) {
  console.log('Connected: ' + frame);
  compatClient.subscribe('/topic/greetings', function(message) {
    console.log('Message: ' + message.body);
  });
}

compatClient.onStompError = function(frame) {
  console.log('Broker reported error: ' + frame.headers['message']);
  console.log('Additional details: ' + frame.body);
}

compatClient.activate();
