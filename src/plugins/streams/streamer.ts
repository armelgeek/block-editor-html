export default class Streamer {
  private readonly ac: any;
  private url: any;
  private readonly store: any;
  private readonly name: any;
  private active: GainNode;
  private readonly gain: GainNode;
  private garbageBuffer: any;
  private startTime: any;
  private startOffset: number | null;
  private stopped: boolean;
  private ready: boolean;
  private duration: any;
  // @ts-ignore
  private ending: any;
  private fetchtimer: any;
  private logtimer: any;

  /**
   * streamer constructor
   *
   * @method constructor
   *
   * @param  {String}     url   – audio asset url
   * @param ac
   * @param  {AudioStore} store – AudioStore instance
   * @return {Streamer}
   */

  constructor( url:any, ac:any,store:any) {
    this.url    = url;
    this.ac = ac;
    this.store = store;
    this.name   = url.split('/').pop().split('.')[ 0 ];
    this.active = ac.createGain();
    this.gain   = ac.createGain();
    this.gain.gain.value = 1;
    // throwaway audio buffer
    this.garbageBuffer = this.ac.createBuffer( 1, 1, 44100 );

    this.startTime   = null;
    this.startOffset = null;

    this.stopped = true;
    this.ready   = false;

    this.active.connect( this.gain );
    this.gain.connect( this.ac.destination );
  }
  /**
   * Preload a chunk so that a subsequent call to `stream()` can
   * begin immediately without hitting thr database
   *
   * @method prime
   *
   * @param  {Number} offset – offset in seconds (defaults to 0 or last time )
   * @return {Promise}       – resolves with `this` on completion
   */


  /**
   * Begin playback at the supplied offset (or resume playback)
   *
   * @method stream
   *
   * @param  {Number} offset – offset in seconds (defaults to 0 or last time )
   * @param callback
   * @return {Streamer}
   */

  stream( offset:any,callback:any ) {
    if ( typeof offset !== 'number' ) {
      offset = this.startOffset !== null ? this.startOffset : 0;
    }

   if ( !this.ready ) {
     console.log(`asset ${ this.name } not loaded` );
    }

    if ( !this.stopped ) {
      global.app_event.playerPlaying();
      global.app_event.play();
      console.log( `stream ${ this.name } is already playing` );
    }

    if ( this.ending ) {
      this.ending.onended = () => {
        global.app_event.playerEnded();
        global.app_event.playerEmptied();
        console.log('stream ending ...')

      };
      this.ending = null;
    }

    if ( offset >= this.duration ) {
      global.app_event.playerPause();
      global.app_event.pause();
      console.log('ending ...')
      return this.stop();
    }
    // mobile browsers require the first AudioBuuferSourceNode#start() call
    // to happen in the same call stack as a user interaction.
    //
    // out Promise-based stuff breaks that, so we try to get ourselves onto
    // a good callstack here and play an empty sound if we haven't done
    // so already
    if ( this.garbageBuffer ) {
      const src = this.ac.createBufferSource();
      src.buffer = this.garbageBuffer;
      src.start( 0 );
      delete this.garbageBuffer;
    }

    this.stopped = false;
    this.startOffset = offset;

   // console.info( `streaming ${ this.name } @ ${ offset }s` );

    const play = ( src:any, when:any, offset:any, output:any) => {
      const logtime = ( when - this.ac.currentTime ) * 1000;
      const logstr  = `playing chunk ${ this.name } @ ${ offset }s`;

     // this.logtimer = setTimeout( () => console.info( logstr ), logtime );
      global.app_event.playerPlaying();
      global.app_event.play();
      src.connect( output );
      src.start( when );

      const dur = src.buffer.duration;

      when += dur;
      offset += dur;

      if ( offset >= this.duration ) {
        this.ending = src;
         src.onended = () => {
           global.app_event.playerPause()
           global.app_event.pause()
          callback();
         };
       // console.info( `end of file ${ this.name }` );
        return;
      }
      this.fetchtimer = setTimeout( () => {
       // console.info( `need chunk ${ this.name } @ ${ offset }s` );

        /* eslint-disable no-use-before-define */
        next( when, offset, output );
      }, ( when - this.ac.currentTime ) * 1000 - 2000 );
    };

    const next = ( when = 0, offset = 0, output:any ) => {
      const chunkDuration = Math.min( 5, this.duration - offset );
      this.store.getAudioBuffer( this.name, offset, chunkDuration )
      .then( (record:any) => {
        if ( this.stopped || output !== this.active ) {
          return;
        }

        const ab  = record;
        const src = this.ac.createBufferSource();

        src.buffer = ab;

        if ( when === 0 ) {
          when = this.ac.currentTime;
        }

        if ( this.startTime === null ) {
          this.startTime = when;
        }

        play( src, when, offset, output);
      })
      .catch( (err:any) => console.log( err ) );
    };
    next( 0, offset, this.active);

    return this;
  }

  /**
   * stop all playback
   *
   * @method stop
   *
   * @return {Streamer}
   */

  stop() {
    if ( this.stopped || !this.ready ) {
      return;
    }

    this.stopped = true;
    this.active.disconnect();
    this.active =this.ac.createGain();
    this.active.connect( this.gain );

    const elapsed = this.ac.currentTime - this.startTime;

    this.startTime = null;
    // @ts-ignore
    this.startOffset += elapsed;
    global.app_event.playerPause()
    global.app_event.pause()
    // console.info( `stopping ${ this.name } @ ${ this.startOffset }s` );

    // @ts-ignore
    if ( this.startOffset >= this.duration ) {
      this.startOffset = 0;
    }

    clearTimeout( this.fetchtimer );
    clearTimeout( this.logtimer );

    return this;
  }

  /**
   * return the current cursor position in seconds
   *
   * @method currentTime
   *
   * @return {Number}    – current playback position in seconds
   */

  currentTime() {
    if ( this.stopped ) {
      return this.startOffset;
    }

    const start   = this.startTime || this.ac.currentTime;
    const offset  = this.startOffset || 0;
    const elapsed = this.ac.currentTime - start;
    global.lx.currentPosition = offset + elapsed;
    return offset + elapsed;
  }
  setUrl(newUrl:string){
    this.url = newUrl;
  }
  /**
   * set the current cursor position in seconds
   *
   * @method seek
   * @param  {Number}   offset – offset in seconds
   * @param callback
   * @return {Streamer}
   */

  async seek( offset:any ,callback:any ) {
    if ( !this.stopped ) {
      this.stop();
      this.stream( offset,callback);
    } else {
      this.startOffset = offset;
    }
  }

  /**
   * load the audio asset at `this.url`
   *
   * @method load
   *
   * @return {Promise} – resolves with `true`
   */

  async load( force = false ) {

    if ( !force ) {
      //console.info( `checking cache for ${ this.name }` );

      try {
        const { duration } = await this.store.getMetadata( this.name );

        //console.info( `cache hit for ${ this.name }` );
        Object.assign( this, { duration, ready: true } );
        return true;
      } catch {}
    }

    //console.info( `fetching ${ this.url }` );
    global.app_event.pause()
    global.app_event.playerWaiting()
    return new Promise( ( resolve, reject ) => {
      const xhr = new XMLHttpRequest();

      xhr.open( 'GET', this.url, true );
      xhr.responseType = 'arraybuffer';

      xhr.onload = () => {
        global.app_event.playerLoadstart()
        this.ac.decodeAudioData( xhr.response, (ab:any) => {
          this.store.saveAudioBuffer( this.name, ab ).then( (metadata:any) => {
            this.duration = metadata.duration;
           //console.info( `fetched ${ this.url }` );
            this.ready = true;
            global.app_event.playerPause()
            global.app_event.pause()
            resolve( true );
          }, reject );
        }, reject );
      };

      xhr.onerror = (e) => {
        global.app_event.error()
        global.app_event.playerError()
        console.log('error',e);
        reject(e);
      };

      xhr.send();
    });


  }
  getDuration(){
    return this.duration;
  }
  getState(){
    return {
      url: this.url,
      name: this.name,
      startTime:this.startTime,
      stopped: this.stopped,
      ready : this.ready
    }
  }
  setVolume(volume:number){
    this.gain.gain.value =volume;
    this.active.connect( this.gain );
    this.gain.connect( this.ac.destination );
  }


}
