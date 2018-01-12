namespace TrackList {

    //
    // Singleton - класс трэк-лист
    //
    class TrackList {

        // =================== private поля =================== //


        // Singleton - экземепляр
        private static _instance: TrackList = null;

        // Полоса прокрутки
        private _vscroll: Element;

        // Список треков
        private _track_list: Element;

        // Проигрываемый трэк
        private _played_audio_track: Element;

        // Выбранные трэки
        private _selected_audio_tracks: Element[] = [];

        // Панель трэк-листа
        private _panel: Element;


        // =================== private методы =================== //


        //
        // Конструктор
        //
        private constructor() {
            // Получение доступа к панели трэк-листа
            this._panel = document.getElementsByClassName('panel')[0];
            // Получение доступа к полосе прокрутки
            this._vscroll = document.getElementsByClassName('panel__vscroll')[0];
            // Получение доступа к трэк-листу
            this._track_list = document.getElementsByClassName('track-list')[0];
            // Drag and Drop файлов в трэк-лист
            this._panel.addEventListener('drop', function (e: Event) {
                e.preventDefault();
                this._addDropFiles(e.dataTransfer.files);
            }, false);
            this._panel.addEventListener('drag', function (e: Event) {
                e.preventDefault();
            });
            this._panel.addEventListener('dragover', function (e: Event) {
                e.preventDefault();
            });
        }


        //
        // Удалить аудиотрэк из списка
        //
        private delAudiotrack(audio_track: Element): void {
            this._track_list.removeChild(audio_track);
        }


        //
        // Добавление перемещённых файлов в трэк-лист
        //
        private addDropFiles(files : FileList) {
            // TODO: release it !
        }


        // =================== public методы =================== //


        //
        // Пометить трэк как проигрываемый
        //
        public setPlayed(audio_track: Element): void {
            this.clearPlayed();
            audio_track.classList.add('audio-track_played');
        }


        //
        // Убрать выделение с проигрываемого трэка
        //
        public clearPlayed(): void {
            this._played_audio_track.classList.remove('audio-track_played');
        }


        //
        // Пометить трэк как выбранный
        //
        public setSelected(audio_track: Element): void {
            this._selected_audio_tracks.push(audio_track);
            audio_track.classList.add('audio-track_selected');
        }


        //
        // Убрать пометку, что трэк выбран
        //
        public clearSelected(audio_track: Element): void {
            this._selected_audio_tracks.filter(selected_audio_track =>
                selected_audio_track !== audio_track
            );
            audio_track.classList.remove('audio-track_selected');
        }


        //
        // Убрать пометку, что трэки выбраны
        //
        public clearSelecteds(): void {
            this._selected_audio_tracks.forEach(selected_audio_track =>
                selected_audio_track.classList.remove('audio-track_selected')
            );
            this._selected_audio_tracks = [];
        }


        //
        // Скрыть компонент
        //
        public hide(): void {
            this._panel.classList.remove('panel_show');
            this._panel.classList.add('panel_hide');
        }


        //
        // Отобразить компонент
        //
        public show(): void {
            this._panel.classList.remove('panel_hide');
            this._panel.classList.add('panel_show');
        }


        //
        // Удалить все выделенные аудиотрэки из списка
        //
        public delSelectedAudiotracks(): void {
            this._selected_audio_tracks.forEach(selected_audio_track =>
                this._track_list.removeChild(selected_audio_track)
            );
        }


        //
        // Добавить аудотрэки
        //
        public addAudiotracks(): void {
            // TODO: release it !
            this._track_list.appendChild(document.createElement('<div>'));
        }


        //
        // Получение экземепляра - сиглтона
        //
        public static getInstance(): TrackList {
            if (TrackList._instance === null) {
                TrackList._instance = new TrackList();
            }

            return TrackList._instance;
        }

    }


    export const getInstance = TrackList.getInstance;

}
