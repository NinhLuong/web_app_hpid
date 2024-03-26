import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

import 'src/menu.dart';                               // ADD
import 'src/navigation_controls.dart';
import 'src/web_view_stack.dart';
import 'package:shared_preferences/shared_preferences.dart';


void main() {
  runApp(
    const MaterialApp(
      home: WebViewApp(),
      debugShowCheckedModeBanner: false,
    ),
  );
}

class WebViewApp extends StatefulWidget {
  const WebViewApp({super.key});

  @override
  State<WebViewApp> createState() => _WebViewAppState();
}

class _WebViewAppState extends State<WebViewApp> {
  late final WebViewController controller = WebViewController();

  get cookieManager => null;

  Future<void> saveUrl(String url) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.setString('url', url);
  }

  Future<String> loadUrl() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String url = prefs.getString('url') ?? 'https://hpidweb.homethang.duckdns.org/';
    return url;
  }


  @override
  void initState() {
    super.initState();
    loadUrl().then((url) {
      setState(() {
        controller.loadRequest(Uri.parse(url));
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(

      appBar: AppBar(
        title: const Text('Port Management'),
        actions: [
          NavigationControls(controller: controller),
          Menu(controller: controller),               // ADD
        ],
      ),
      body: WebViewStack(controller: controller),
    );
  }

}