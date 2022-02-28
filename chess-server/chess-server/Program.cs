using System;
using System.Diagnostics;
using WebSocketSharp;
using WebSocketSharp.Server;

namespace chess_server
{
    public class Echo : WebSocketBehavior
    {
        protected override void OnMessage(MessageEventArgs e)
        {
            Console.WriteLine(e.Data);
            Send(e.Data);
        }
    }

    public class EchoAll : WebSocketBehavior
    {
        protected override void OnMessage(MessageEventArgs e)
        {
            Console.WriteLine(e.Data);
            Sessions.Broadcast(e.Data);
        }
    }
    internal class Program
    {
        static void Main(string[] args)
        {
            WebSocketServer webSocketServer = new WebSocketServer("ws://127.0.0.1:5000");
            webSocketServer.AddWebSocketService<EchoAll>("/echo"); //deve conter o endereço da partida

            webSocketServer.Start();
            Console.WriteLine("Server started");
            Console.ReadKey();
            webSocketServer.Stop();
        }
    }
}
