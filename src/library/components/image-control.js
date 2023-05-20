import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose'
import { useState } from '@wordpress/element'
import {
    InspectorAdvancedControls,
    InspectorControls,
    useSetting,
    __experimentalPanelColorGradientSettings as PanelColorGradientSettings,
} from '@wordpress/block-editor'
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

import {
    ToggleControl,
    PanelBody,
    SearchControl,
    ColorPicker,
    ColorPalette,
    Tooltip,
    Popover,
    Autocomplete,
    Button,
    ButtonGroup,
    SelectControl,
} from '@wordpress/components'

import DimensionControl from './dimension-control';
import { iconImage, iconUpload } from '../icons/icons';
import { FormFileUpload } from '@wordpress/components';
import { TextControl } from '@wordpress/components';

export default function ImageControl({ value, onChange, label, text }) {
    console.log('render image control');
    return (
        <>
            <MediaUploadCheck>
                <MediaUpload
                    onSelect={(media) => {
                        onChange(media);
                    }}
                    allowedTypes={['image']}
                    value={value}
                    render={({ open }) => {
                        
                        return (
                        <Button label={label} onClick={open} className='dragblock-upload-media-control'>
                            {text}
                        </Button>
                    )}}
                />
            </MediaUploadCheck>
        </>
    );
}