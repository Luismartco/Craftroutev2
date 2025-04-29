@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Selecciona hasta 3 imágenes</div>

                <div class="card-body">
                    <div class="row">
                        @for($i = 1; $i <= 9; $i++)
                            <div class="col-md-4 mb-3">
                                <div class="image-selector" data-image-id="{{ $i }}">
                                    <img src="{{ asset('media/recomendaciones/imagen' . $i . '.jpg') }}" 
                                         class="img-fluid" 
                                         style="cursor: pointer; border: 2px solid #ddd;"
                                         onclick="toggleSelection(this)">
                                </div>
                            </div>
                        @endfor
                    </div>
                    <div class="text-center mt-4">
                        <button class="btn btn-primary" onclick="enviarSeleccion()">Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .image-selector.selected img {
        border: 2px solid #007bff !important;
    }
</style>

<script>
    let selectedImages = [];

    function toggleSelection(element) {
        const selector = element.parentElement;
        const imageId = selector.getAttribute('data-image-id');
        
        if (selector.classList.contains('selected')) {
            selector.classList.remove('selected');
            selectedImages = selectedImages.filter(id => id !== imageId);
        } else {
            if (selectedImages.length < 3) {
                selector.classList.add('selected');
                selectedImages.push(imageId);
            }
        }
    }

    function enviarSeleccion() {
        console.log('Imágenes seleccionadas:', selectedImages);
        // Aquí puedes agregar la lógica para enviar las imágenes seleccionadas
    }
</script>
@endsection 