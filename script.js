$(document).ready(function () {
    $("#addBtn").on("click", function () {
        const taskInput = $("#taskInput");
        const taskText = taskInput.val().trim();
    
        if (taskText == "") {
            alert("Por favor, adicione uma tarefa!");
            return;
        }
    
        const todoList = $("#todoList");
        const li = $("<li></li>");
    
        // Criando o texto da tarefa
        const taskLabel = $("<span></span>").text(taskText);

        const 
            completeBtn = $("<button class=\"complete-btn\">✔️</button>")
            , deleteBtn = $("<button class=\"delete-btn\">🗑️</button>")
            , playPauseBtn = $("<button class=\"play-btn\">▶️</button>")
            , timeDisplay = $("<span> 00:00</span>")
        ;
    
        let isPlaying = false;
        let seconds = 0;
        let interval;
  
        // Função para formatar os segundos em minutos:segundos
        function formatTime(sec) {
            const minutes = Math.floor(sec / 60);
            const remainingSeconds = sec % 60;
            return `${minutes < 10 ? "0" : ""}${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
        }
  
        // Função Play/Pause
        playPauseBtn.on("click", () => {
            if (li.hasClass("completed")) {
                return; // Impede de controlar se a tarefa estiver completa
            }

            isPlaying = !isPlaying;
    
            if (isPlaying) {
                playPauseBtn.text("⏸️");  // Troca para "Pause"
                playPauseBtn.removeClass("play-btn").addClass("pause-btn");
        
                interval = setInterval(function () {
                    seconds++;
                    timeDisplay.text(formatTime(seconds));  // Atualiza o tempo
                }, 1000);
            }
            else {
                playPauseBtn.text("▶️");  // Troca para "Play"
                playPauseBtn.removeClass("pause-btn").addClass("play-btn");
        
                clearInterval(interval); // Para o contador
            }
        });
    
        // Função de completar tarefa
        completeBtn.on("click", function () {
            taskLabel.html(`<s>${taskText}</s>`);
            playPauseBtn.prop("disabled", true).addClass("disabled");
            completeBtn.prop("disabled", true).addClass("disabled");
        });
    
        // Função para excluir a tarefa
        deleteBtn.on("click", function () {
            li.fadeOut(300, function () {
                $(this).remove();  // Remove a tarefa com fade out
            });
        });
    
        // Adicionando todos os elementos à tarefa
        li.append(taskLabel, completeBtn, deleteBtn, playPauseBtn, timeDisplay);
    
        // Adicionando a tarefa à lista com animação de fade
        todoList.append(li);
        li.hide().fadeIn(500);  // Animação para aparecer
    
        // Limpando o campo de entrada após adicionar a tarefa
        taskInput.val("");
    });
});
    