import {Constants} from '../constants';
import {MetaEvent} from './meta-event';
import {Utils} from '../utils';

/**
 * Object representation of a tempo meta event.
 * @param {object} fields {text: string, delta: integer}
 * @return {TrackNameEvent}
 */
class TrackNameEvent implements MetaEvent {
	delta: number;
	text: string;

	constructor(fields: { text: string; delta?: number; }) {
		this.delta = fields.delta || 0x00;
		this.text = fields.text;
	}

	public get data() {
		const textBytes = Utils.stringToBytes(this.text);

		// Start with zero time delta
		return Utils.numberToVariableLength(this.delta).concat(
			Constants.META_EVENT_ID,
			this.type,
			Utils.numberToVariableLength(textBytes.length), // Size
			textBytes, // Text
		);
	}

	public get name() {
		return 'TrackNameEvent';
	}

	public get type() {
		return 0x03;
	}
}

export {TrackNameEvent};
