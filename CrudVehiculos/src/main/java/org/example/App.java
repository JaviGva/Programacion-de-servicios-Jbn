package org.example;
import com.google.gson.Gson;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;
/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {
        Scanner scanner = new Scanner(System.in);
        String baseUrl = "http://localhost:8080/vehiculos/"; // La URL base de tu API REST

        while (true) {
            // Menú de opciones
            System.out.println("Seleccione una opción:");
            System.out.println("1. Obtener todos los vehículos");
            System.out.println("2. Obtener un vehículo por su ID");
            System.out.println("3. Insertar un nuevo vehículo");
            System.out.println("4. Actualizar un vehículo");
            System.out.println("5. Eliminar un vehículo");
            System.out.println("6. Salir");

            int opcion = scanner.nextInt();
            scanner.nextLine(); // Limpiar el buffer del scanner

            switch (opcion) {
                case 1:
                    try {
                        // Abrir conexión
                        HttpURLConnection connection = (HttpURLConnection) new URL(baseUrl).openConnection();
                        connection.setRequestMethod("GET");

                        // Leer la respuesta
                        BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                        String line;
                        StringBuilder response = new StringBuilder();

                        while ((line = reader.readLine()) != null) {
                            response.append(line);
                        }
                        reader.close();
                        System.out.println("Vehiculos registrados:");

                        Gson gson = new Gson();
                        Vehiculo[] vehiculosArray = gson.fromJson(response.toString(), Vehiculo[].class);
                        List<Vehiculo> vehiculos = Arrays.asList(vehiculosArray);
                        int i = 1;
                        // Imprimir la lista de vehículos
                        for (Vehiculo vehiculo : vehiculos) {
                            System.out.println(i + ". " + vehiculo.getMarca() + " " + vehiculo.getModelo() +", Año: " + vehiculo.getAño() + ", Color: " + vehiculo.getColor());
                            i++;
                        }
                        System.out.println();

                        // Cerrar la conexión
                        connection.disconnect();
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    break;
                case 2:
                    System.out.println("Introduce la id del vehiculo a buscar: ");

                    String id = scanner.nextLine();
                    try {
                        // Abrir conexión
                        HttpURLConnection connection = (HttpURLConnection) new URL(baseUrl + id).openConnection();
                        connection.setRequestMethod("GET");

                        // Leer la respuesta
                        BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                        String line;
                        StringBuilder response = new StringBuilder();

                        while ((line = reader.readLine()) != null) {
                            response.append(line);
                        }
                        reader.close();

                        System.out.println("Vehiculos encontrado:");

                        Gson gson = new Gson();
                        Vehiculo vehiculo = gson.fromJson((response).toString(), Vehiculo.class);

                        System.out.println(vehiculo.getMarca() + " " + vehiculo.getModelo() +", Año: " + vehiculo.getAño() + ", Color: " + vehiculo.getColor());

                        System.out.println();

                        // Cerrar la conexión
                        connection.disconnect();
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    break;
                case 3:
                    System.out.println("Introduce los datos del nuevo vehículo:");
                    System.out.print("Marca: ");
                    String marca = scanner.nextLine();
                    System.out.print("Modelo: ");
                    String modelo = scanner.nextLine();
                    System.out.print("Año: ");
                    int año = scanner.nextInt();
                    scanner.nextLine(); // Limpiar el buffer
                    System.out.print("Color: ");
                    String color = scanner.nextLine();

                    // Crear objeto Vehiculo con los datos ingresados
                    Vehiculo nuevoVehiculo = new Vehiculo(marca, modelo, año, color);

                    try {
                        // Convertir el objeto a JSON
                        Gson gson = new Gson();
                        String jsonVehiculo = gson.toJson(nuevoVehiculo);

                        // Crear conexión y enviar la solicitud POST
                        HttpURLConnection connection = (HttpURLConnection) new URL(baseUrl).openConnection();
                        connection.setRequestMethod("POST");
                        connection.setRequestProperty("Content-Type", "application/json");
                        connection.setDoOutput(true);

                        // Escribir los datos del vehículo en el cuerpo de la solicitud
                        connection.getOutputStream().write(jsonVehiculo.getBytes());

                        // Leer la respuesta (opcional)
                        BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                        String line;
                        StringBuilder response = new StringBuilder();
                        while ((line = reader.readLine()) != null) {
                            response.append(line);
                        }
                        reader.close();

                        System.out.println("Vehículo insertado correctamente.");

                        // Cerrar la conexión
                        connection.disconnect();
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    break;
                case 4:
                    System.out.println("Introduce la id del vehiculo a actualizar: ");

                    id = scanner.nextLine();

                    System.out.println("Introduce los datos del vehículo actualizados:");
                    System.out.print("Marca: ");
                    marca = scanner.nextLine();
                    System.out.print("Modelo: ");
                    modelo = scanner.nextLine();
                    System.out.print("Año: ");
                    año = scanner.nextInt();
                    scanner.nextLine(); // Limpiar el buffer
                    System.out.print("Color: ");
                    color = scanner.nextLine();

                    // Crear objeto Vehiculo con los datos ingresados
                    Vehiculo updatedVehiculo = new Vehiculo(marca, modelo, año, color);

                    try {
                        // Convertir el objeto a JSON
                        Gson gson = new Gson();
                        String jsonVehiculo = gson.toJson(updatedVehiculo);

                        // Crear conexión y enviar la solicitud POST
                        HttpURLConnection connection = (HttpURLConnection) new URL(baseUrl + id).openConnection();
                        connection.setRequestMethod("PUT");
                        connection.setRequestProperty("Content-Type", "application/json");
                        connection.setDoOutput(true);

                        // Escribir los datos del vehículo en el cuerpo de la solicitud
                        connection.getOutputStream().write(jsonVehiculo.getBytes());

                        // Leer la respuesta (opcional)
                        BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                        String line;
                        StringBuilder response = new StringBuilder();
                        while ((line = reader.readLine()) != null) {
                            response.append(line);
                        }
                        reader.close();

                        System.out.println("Vehículo actualizado correctamente.");

                        // Cerrar la conexión
                        connection.disconnect();
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    break;
                case 5:
                    System.out.println("Introduce la ID del vehículo a eliminar:");
                    String idEliminar = scanner.nextLine();

                    try {
                        // Crear conexión y enviar la solicitud DELETE
                        HttpURLConnection connection = (HttpURLConnection) new URL(baseUrl + idEliminar).openConnection();
                        connection.setRequestMethod("DELETE");

                        // Leer la respuesta (opcional)
                        BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                        String line;
                        StringBuilder response = new StringBuilder();
                        while ((line = reader.readLine()) != null) {
                            response.append(line);
                        }
                        reader.close();

                        System.out.println("Vehículo eliminado correctamente.");

                        // Cerrar la conexión
                        connection.disconnect();
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    break;
                case 6:
                    System.out.println("Saliendo...");
                    return;
                default:
                    System.out.println("Opción no válida");
                    break;
            }
        }

    }
}
