// The entry file of your WebAssembly module.

// In der Version 0.10 von AssemblyScript sorgt der Import automatisch dafür, dass WASI-bindings importiert werden.
import "wasi"

  /*
 Aus der as-wasi Doku: A high-level AssemblyScript layer for the WebAssembly System Interface (WASI)
 Macht den Zugriff auf WASI-Funktionalitäten sehr viel einfacher.
 Console um auf stdout zu schreiben, Filesystem für Dateioperationen
  */

import { Console, FileSystem, Descriptor } from "as-wasi"

/* Gibt Hello World! aus, nutzt dafür die WASI-APIs (z.B. fd_write) */
Console.log("Hello World!")

/*
Erstellen oder Öffnen einer Textdatei. (helloworld.txt)
Dafür muss durch den WASI Host (in diesem Beispiel wasmtime) explizit ein Verzeichnis an den Gast freigegeben werden.
Dies wird in wasmtimme durch die --dir Flag beim Aufrufen der entsprechenden Funktion durchgeführt.
Sollte der/die Dateizugriff/Dateierstellung fehlschlagen wird "null" zurückgegeben.
 */
let filePath: string = "helloworld.txt";
let fileOrNull: Descriptor | null = FileSystem.open(filePath, "w+");

/*
Sollte fileOrNull === null sein konnte die Datei nicht geöffnet werden und es wird ein Fehler zurückgegeben
 */
if (fileOrNull == null) {
  throw new Error("Could not open the file " + filePath);
}

// Change our type from Descriptor | null, to Descriptor, as we checked above.
// Meaning, we were able to successfully open/create the file
let file = changetype<Descriptor>(fileOrNull);

// Write "Hello World!" to the file.
file.writeStringLn("Hello World!");

export function add(a: i32, b: i32): i32 {
  return a + b;
}

export function multi(a: i32, b: i32): i64 {
  return a * b
}