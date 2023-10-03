// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::process::Command;
use std::io::Result;
use std::str;
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn get_all_docker_images() -> String {

    let command = "docker"; // Exemple : commande "ls" pour lister les fichiers (peut être n'importe quelle commande shell)

    // Créez une nouvelle instance de Command
    let output = Command::new(command)
        .args(["images", "--format", r#"{{.ID}},{{.Repository}},{{.Size}}"#])
        .output()
        .expect("La commande a échoué"); // Exécutez la commande et panique en cas d'erreur

    // Vérifiez si la commande a réussi
    if output.status.success() {
        // Convertissez la sortie en une chaîne de caractères (String)
        let stdout = str::from_utf8(&output.stdout)
            .expect("La sortie n'est pas une chaîne valide");
        return String::from(stdout);
    } else {
        // En cas d'échec de la commande, affichez le message d'erreur
        let stderr = str::from_utf8(&output.stderr)
            .expect("La sortie d'erreur n'est pas une chaîne valide");
        eprintln!("Erreur de la commande : {}", stderr);
        return String::from(stderr);
    }
}

#[tauri::command]
fn get_all_running_docker() -> String {

    let command = "docker"; // Exemple : commande "ls" pour lister les fichiers (peut être n'importe quelle commande shell)

    // Créez une nouvelle instance de Command
    let output = Command::new(command)
        .args(["ps", "--format", r#""{{.ID}},{{.Image}},{{.Names}}""#])
        .output()
        .expect("La commande a échoué"); // Exécutez la commande et panique en cas d'erreur

    // Vérifiez si la commande a réussi
    if output.status.success() {
        // Convertissez la sortie en une chaîne de caractères (String)
        let stdout = str::from_utf8(&output.stdout)
            .expect("La sortie n'est pas une chaîne valide");
        return String::from(stdout);
    } else {
        // En cas d'échec de la commande, affichez le message d'erreur
        let stderr = str::from_utf8(&output.stderr)
            .expect("La sortie d'erreur n'est pas une chaîne valide");
        eprintln!("Erreur de la commande : {}", stderr);
        return String::from(stderr);
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![get_all_docker_images])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
