<?php 
// Controller untuk menangani operasi CRUD via API (End Point)
namespace App\Controller;

use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

//Semua route akan dimulai dengan /api/products. name digunakan untuk memberi nama route
#[Route('/api/products', name: 'api_products_')]  // Menentukan prefix route untuk seluruh endpoint API
class ProductController extends AbstractController
{
    // Menampilkan daftar produk
    #[Route('', methods: ['GET'], name: 'list')]
    public function index(EntityManagerInterface $entityManager): JsonResponse
    {
        // Mengambil semua produk dari database menggunakan repository
        $products = $entityManager->getRepository(Product::class)->findAll();
        $data = [];

        // Mengonversi objek produk menjadi array untuk dikembalikan sebagai response
        foreach ($products as $product) {
            $data[] = [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'price' => $product->getPrice(),
                'description' => $product->getDescription(),
            ];
        }

        // Mengembalikan response dalam format JSON
        return $this->json([
            'data' => $data,
            'status' => true,
            'code' => 200,
            'message' => 'Products retrieved successfully'
        ]);
    }

    // Menampilkan detail produk berdasarkan ID
    #[Route('/{id}', methods: ['GET'], name: 'show')]
    public function show(int $id, EntityManagerInterface $entityManager): JsonResponse
    {
        // Mengambil produk berdasarkan ID
        $product = $entityManager->getRepository(Product::class)->find($id);

        // Jika produk tidak ditemukan, mengembalikan response error
        if (!$product) {
            return $this->json([
                'data' => null,
                'status' => false,
                'code' => 404,
                'message' => 'Product not found'
            ]);
        }

        // Jika produk ditemukan, mengembalikan data produk
        return $this->json([
            'data' => [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'price' => $product->getPrice(),
                'description' => $product->getDescription(),
            ],
            'status' => true,
            'code' => 200,
            'message' => 'Product retrieved successfully'
        ]);
    }

    // Menambahkan produk baru
    #[Route('', methods: ['POST'], name: 'create')]
    public function create(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Mengambil data dari request body dalam format JSON
        $data = json_decode($request->getContent(), true);

        // Validasi input, pastikan nama, harga, dan deskripsi ada
        if (!isset($data['name'], $data['price'], $data['description'])) {
            return $this->json([
                'data' => null,
                'status' => false,
                'code' => 400,
                'message' => 'Invalid data'
            ]);
        }

        // Membuat entitas produk baru dan mengisinya dengan data yang didapat dari json
        $product = new Product();
        $product->setName($data['name']);
        $product->setPrice((float) $data['price']);
        $product->setDescription($data['description']);

        // Menyimpan produk ke database
        $entityManager->persist($product);
        $entityManager->flush();

        // Mengembalikan response sukses setelah produk berhasil dibuat
        return $this->json([
            'data' => null,
            'status' => true,
            'code' => 201,
            'message' => 'Product created successfully'
        ]);
    }

    // Mengupdate produk berdasarkan ID
    #[Route('/{id}', methods: ['PUT'], name: 'update')]
    public function update(int $id, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Mengambil produk berdasarkan ID
        $product = $entityManager->getRepository(Product::class)->find($id);

        // Jika produk tidak ditemukan, mengembalikan response error
        if (!$product) {
            return $this->json([
                'data' => null,
                'status' => false,
                'code' => 404,
                'message' => 'Product not found'
            ]);
        }

        // Mengambil data dari request body
        $data = json_decode($request->getContent(), true);

        // Memperbarui produk jika data tersedia
        if (isset($data['name'])) {
            $product->setName($data['name']);
        }
        if (isset($data['price'])) {
            $product->setPrice((float) $data['price']);
        }
        if (isset($data['description'])) {
            $product->setDescription($data['description']);
        }

        // Menyimpan perubahan produk ke database
        $entityManager->flush();

        // Mengembalikan response sukses setelah produk berhasil diperbarui
        return $this->json([
            'data' => null,
            'status' => true,
            'code' => 200,
            'message' => 'Product updated successfully'
        ]);
    }

    // Menghapus produk berdasarkan ID
    #[Route('/{id}', methods: ['DELETE'], name: 'delete')]
    public function delete(int $id, EntityManagerInterface $entityManager): JsonResponse
    {
        // Mengambil produk berdasarkan ID
        $product = $entityManager->getRepository(Product::class)->find($id);

        // Jika produk tidak ditemukan, mengembalikan response error
        if (!$product) {
            return $this->json([
                'data' => null,
                'status' => false,
                'code' => 404,
                'message' => 'Product not found'
            ]);
        }

        // Menghapus produk dari database
        $entityManager->remove($product);
        $entityManager->flush();

        // Mengembalikan response sukses setelah produk berhasil dihapus
        return $this->json([
            'data' => null,
            'status' => true,
            'code' => 200,
            'message' => 'Product deleted successfully'
        ]);
    }
}
